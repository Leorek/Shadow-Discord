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
import AllCommands from "../Commands";

type Command = {
  name: string;
  help: string;
  permissions: Array<any>;
  platforms: Array<any>;
  execute: Function;
};

type CommandRef = {
  ref: Command;
  params: Array<any>;
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
  }

  onMessage(platform, content, msg) {
    console.log("Received message");
    const command = this.getCommand(content);

    if (!isEmpty(command.ref)) {
      if (this.userHasPermissions()) {
        console.log("Executing command: " + command.ref.name);
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
    forEach(
      category =>
        forEach(
          command =>
            this.commands.set(
              AllCommands[category][command].name,
              AllCommands[category][command]
            ),
          keysIn(AllCommands[category])
        ),
      keysIn(AllCommands)
    );
  }
}
