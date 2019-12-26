import * as TelegramBot from "node-telegram-bot-api";
import { CommandManager } from "../CommandManager";
import { isGif } from "../Utils";

export class TelegramController {
  public platform = "telegram";
  private bot;
  public prefix = "";

  constructor(config) {
    this.prefix = config.defaultPrefix;
    this.bot = new TelegramBot(config.token, { polling: true });
    this.setUpEvents();
  }

  setUpEvents() {
    this.bot.on("text", this.onMessage);
    this.bot.on("error", error => {
      console.log("I had an error", error);
    })
  }

  private onMessage = context => {
    console.log("Received new message", context);
    const text = context.text;

    if (text.startsWith(this.prefix)) {
      // Check which command is
      const name = this.getCommandName(text);
      // Get params of command
      const params = {};
      // Execute command
      const command: any = CommandManager.getInstance().getCommand(this.platform, name);
      command.execute(new TelegramContext(this.bot, context), params);
    }
  };

  private getCommandName(text){
    const textSplit = text.split(" ");
    return textSplit[0].substr(1); // In order to remove the prefix
  }
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