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
    this.registerCommands();
    this.bot.startPolling();
  }

  private registerCommands() {
    for (let group in this.commands) {
      console.log("Group: ");
      console.log(group);
      this.bot.command(this.commands[group].name, ctx =>
        this.commands[group].execute("telegram", ctx)
      );
    }
  }
}

export default TelegramController;
