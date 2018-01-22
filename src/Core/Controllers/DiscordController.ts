import * as DiscordBot from "discord.js";

export default class DiscordController {
  public platform = "discord";
  private bot;
  private master;
  private lang;

  constructor(token, lang, master) {
    this.master = master;
    this.bot = new DiscordBot.Client();
    this.bot.login(token);
    this.lang = lang;
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

  public sendMessage(context, message) {
    // lang.__("something_went_wrong")
    context.channel.send(message);
  }

  public sendImage(context, image) {
    context.channel.send(image);
  }
}
