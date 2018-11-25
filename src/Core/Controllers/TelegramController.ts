import * as TelegramBot from "node-telegram-bot-api";
import { isGif } from "../Utils";

export default class TelegramController {
  public platform = "telegram";
  private bot;
  private master;
  private lang;
  public prefix = "";

  constructor(config, lang, master) {
    this.master = master;
    this.prefix = config.prefix;
    this.bot = new TelegramBot(config.token, { polling: true });
    this.lang = lang;
    this.setUpEvents();
  }

  setUpEvents() {
    this.bot.on("message", msg => {
      this.master.onMessage(this, msg);
    });
  }

  public getContent(msg) {
    return msg.text;
  }

  public getUserId(msg) {
    return msg.from.id;
  }

  public sendMessage(context, message) {
    this.bot.sendMessage(context.chat.id, message);
  }

  public sendImage(context, image) {
    if (isGif(image)) {
      this.bot.sendDocument(context.chat.id, image);
    } else {
      this.bot.sendPhoto(context.chat.id, image);
    }
  }
}
