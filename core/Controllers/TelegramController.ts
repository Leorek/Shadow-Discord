import * as TelegramBot from "node-telegram-bot-api";
import { CommandManager } from "../CommandManager";
import { isGif } from "../Utils";

export class TelegramController {
  private platform = "telegram";
  private bot;
  private commands: CommandManager;
  public prefix = "";

  constructor(config) {
    this.prefix = config.defaultPrefix;
    this.commands = new CommandManager(this.platform);
    this.commands.loadCommands();
    this.bot = new TelegramBot(config.token, { polling: true });
    this.setUpEvents();
  }

  setUpEvents() {
    this.bot.on("text", this.onMessage);
    this.bot.on("error", error => {
      console.log("I had an error", error);
    });
  }

  private onMessage = context => {
    const text = context.text;

    if (text.startsWith(this.prefix)) {
      const textSplit = text.split(" ");
      // Check which command is
      const name = textSplit[0].substr(1); // In order to remove the prefix
      // Get params of command
      const params = textSplit.length > 1 ? textSplit.slice(1) : [];
      // Execute command
      const command: any = this.commands.getCommand(this.platform, name);

      if (command) {
        const commandContext = new TelegramContext(this.bot, context);
        command.execute(commandContext, params);
      }
    }
  };
}

class TelegramContext {
  bot: any;
  context: any;

  constructor(bot, context) {
    this.bot = bot;
    this.context = context;
  }

  public getContent() {
    return this.context.text;
  }

  public getUserId() {
    return this.context.from.id;
  }

  public sendMessage(message) {
    this.bot.sendMessage(this.context.chat.id, message);
  }

  public sendImage(image) {
    if (isGif(image)) {
      this.bot.sendDocument(this.context.chat.id, image);
    } else {
      this.bot.sendPhoto(this.context.chat.id, image);
    }
  }
}