import * as TelegramBot from "telegraf";

class TelegramController {
  public bot;
  private commands;
  constructor(token, commands) {
    this.bot = new TelegramBot(token);
    this.commands = commands;
    this.bot.start(ctx => {
      console.log("started:", ctx.from.id);
      return ctx.reply("Welcome!");
    });
    this.bot.startPolling();
  }
}

export default TelegramController;
