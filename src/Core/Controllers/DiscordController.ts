import * as DiscordBot from "discord.js";

export default class DiscordController {
  public platform = "discord";
  private bot;
  private master;

  constructor(token, master) {
    this.master = master;
    this.bot = new DiscordBot.Client();
    this.bot.login(token);
    this.setupEvents();
  }

  setupEvents() {
    this.bot.on("message", msg => {
      this.master.onMessage(this, msg);
    });
  }

  public getContent(msg) {
    return msg.content;
  }
}
