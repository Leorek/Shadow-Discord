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
import { userHasPermissions } from "./Core/UsersManagement";
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
    if (!isNil(config.discord) && !isEmpty(config.discord)) {
      this.discordBot = new DiscordController(config.discord, Lang, this);
    } else {
      console.log("Discord module is disabled. (Bad configuration?)");
    }
    if (!isNil(config.telegram) && !isEmpty(config.telegram)) {
      this.telegramBot = new TelegramController(config.telegram, Lang, this);
    } else {
      console.log("Telegram module is disabled. (Bad configuration?)");
    }
    if (!isNil(config.twitch) && !isEmpty(config.twitch)) {
      this.twitchBot = new TwitchController(config.twitch, Lang, this);
    } else {
      console.log("Twitch module is disabled. (Bad configuration?)");
    }

    this.registerCommands();
    this.configureLanguage();
  }

  onMessage(controller, context) {
    console.log("Received message: ");
    console.log(controller.getContent(context));
    const command = this.getCommand(controller, context);
    if (!isEmpty(command.ref.name)) {
      userHasPermissions(controller, context, command).then(hasPermissions => {
        if (hasPermissions) {
          console.log("Executing command: " + command.ref.name);
          if (command.ref.name === "help") {
          } else {
            command.ref.execute(controller, context, command);
          }
        } else {
          console.log("This user doesn't have permissions");
        }
      });
    }
  }

  private getCommand(controller, context) {
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
    const content = controller.getContent(context);
    if (
      !isNil(content) &&
      !isEmpty(content) &&
      startsWith(controller.prefix, content)
    ) {
      const commandSplitted = split(" ", content);

      if (length(commandSplitted) > 0) {
        const commandName = toLower(
          takeLast(
            length(commandSplitted[0]) - length(controller.prefix),
            commandSplitted[0]
          )
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
