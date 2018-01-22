import * as Lang from "i18n";
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
import DiscordController from "./Core/Controllers/DiscordController";
import TelegramController from "./Core/Controllers/TelegramController";
import TwitchController from "./Core/Controllers/TwitchController";
const config = require("../config.json");
const AllCommands = RD(module, "./Core/Commands");

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

class Shadow {
  private discordBot;
  private telegramBot;
  private twitchBot;
  private commands = new Map<String, Command>();

  constructor(config) {
    if (!isNil(config.tokens.discord) && !isEmpty(config.tokens.discord)) {
      this.discordBot = new DiscordController(
        config.tokens.discord,
        Lang,
        this
      );
    }
    if (!isNil(config.tokens.telegram) && !isEmpty(config.tokens.telegram)) {
      this.telegramBot = new TelegramController(
        config.tokens.telegram,
        Lang,
        this
      );
    }
    if (!isNil(config.tokens.twitch) && !isEmpty(config.tokens.twitch)) {
      this.twitchBot = new TwitchController(config.tokens.twitch, Lang, this);
    }

    this.registerCommands();
    this.configureLanguage();
  }

  onMessage(controller, context) {
    console.log("Received message: ");
    console.log(controller.getContent(context));
    const command = this.getCommand(controller.getContent(context));
    if (!isEmpty(command.ref.name)) {
      if (this.userHasPermissions()) {
        console.log("Executing command: " + command.ref.name);
        command.ref.execute(controller, context, command);
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
    forEach(category => {
      forEach(command => {
        this.commands.set(
          AllCommands[category][command].default.name,
          AllCommands[category][command].default
        );
      }, keysIn(AllCommands[category]));
    }, keysIn(AllCommands));
  }

  private configureLanguage() {
    Lang.configure({
      directory: "./Locales"
    });
  }
}

var bot = new Shadow(config);
