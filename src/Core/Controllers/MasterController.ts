import DiscordController from "./DiscordController";
import TelegramController from "./TelegramController";
import {
  isNil,
  isEmpty,
  split,
  startsWith,
  length,
  tail,
  toLower,
  takeLast
} from "ramda";

import AllCommands from "../Commands";

export default class MasterController {
  private discordBot;
  private telegramBot;

  constructor(config) {
    this.discordBot = new DiscordController(config.tokens.discord, this);
    this.telegramBot = new TelegramController(config.tokens.telegram, this);
  }

  onMessage(platform, content, msg) {
    console.log("Received message");
    const command = this.getCommand(content);

    if (this.isAvailableFor(platform, command.name)) {
      // See if user has permissions
      if (this.userHasPermissions()) {
        // Execute command
      }
    }
  }

  private getCommand(content) {
    let command = {
      name: "",
      params: []
    };

    if (!isNil(content) && !isEmpty(content) && startsWith("!", content)) {
      const commandSplitted = split(" ", content);

      if (length(commandSplitted) > 0) {
        command.name = toLower(
          takeLast(length(commandSplitted[0]) - length("!"), commandSplitted[0])
        );
        command.params = tail(commandSplitted);
      }
    }

    return command;
  }

  private isAvailableFor(platform, command) {
    console.log(AllCommands);
    return true;
  }

  private userHasPermissions() {
    return true;
  }
}
