import * as TelegramBot from "node-telegram-bot-api";

export default class TelegramController {
  private bot;
  private master;

  constructor(token, master) {
    this.master = master;
    this.bot = new TelegramBot(token, { polling: true });
    this.setUpEvents();
  }

  setUpEvents() {
    this.bot.on("message", msg => {
      this.master.onMessage("telegram", this.getContent(msg), msg);
    });
  }

  getContent(msg) {
    return msg.text;
  }
}
