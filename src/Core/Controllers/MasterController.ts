import * as Lang from "i18n";
import DiscordController from "./DiscordController";
import TelegramController from "./TelegramController";
import TwitchController from "./TwitchController";
import {
  isNil,
  isEmpty,
  split,
  startsWith,
  length,
  tail,
  toLower,
  takeLast,
  keysIn,
  forEach
} from "ramda";
import * as RD from "require-directory";
const AllCommands = RD(module, "../Commands");

type Command = {
  name: string;
  help: string;
  permissions: Array<String>;
  platforms: Array<String>;
  execute: Function;
};

type CommandRef = {
  ref: Command;
  params: Array<String>;
};

export default class MasterController {
  private discordBot;
  private telegramBot;
  private twitchBot;
  private commands = new Map<String, Command>();

  constructor(config) {
    this.discordBot = new DiscordController(config.tokens.discord, this);
    this.telegramBot = new TelegramController(config.tokens.telegram, this);
    this.twitchBot = new TwitchController(config.tokens.twitch, this);
    this.registerCommands();
    this.configureLanguage();
  }

  onMessage(controller, context) {
    const command = this.getCommand(controller.getContent(context));
    if (!isEmpty(command.ref.name)) {
      if (this.userHasPermissions()) {
        command.ref.execute(controller, context, command, Lang, this);
      }
    }
  }

  private userHasPermissions() {
    return true;
  }

  private getCommand(content) {
    let command: CommandRef = {
      ref: {
        name: "",
        help: "",
        permissions: [],
        platforms: [],
        execute: undefined
      },
      params: []
    };

    if (!isNil(content) && !isEmpty(content) && startsWith("!", content)) {
      const commandSplitted = split(" ", content);

      if (length(commandSplitted) > 0) {
        const commandName = toLower(
          takeLast(length(commandSplitted[0]) - length("!"), commandSplitted[0])
        );
        if (this.commands.has(commandName)) {
          command.ref = this.commands.get(commandName);
          command.params = tail(commandSplitted);
        }
      }
    }

    return command;
  }

  private registerCommands() {
    console.log(AllCommands);
    forEach(category => {
      console.log(category);
      forEach(command => {
        console.log(command);
        this.commands.set(
          AllCommands[category][command].default.name,
          AllCommands[category][command].default
        );
      }, keysIn(AllCommands[category]));
    }, keysIn(AllCommands));
    console.log(this.commands);
  }

  private configureLanguage() {
    Lang.configure({
      directory: "./Locales"
    });
  }
}
