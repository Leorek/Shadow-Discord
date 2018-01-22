import * as TelegramBot from "node-telegram-bot-api";
import { isGif } from "../Utils";

export default class TelegramController {
  private bot;
  private master;
  private lang;

  constructor(token, lang, master) {
    this.master = master;
    this.bot = new TelegramBot(token, { polling: true });
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

  public sendMessage(context, message) {
    // lang.__("something_went_wrong")
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
