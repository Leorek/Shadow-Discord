import * as DiscordBot from "discord.js";

export default class DiscordController {
  public platform = "discord";
  public prefix = "";
  private bot;
  private master;
  private lang;

  constructor(config, lang, master) {
    this.master = master;
    this.prefix = config.prefix;
    this.bot = new DiscordBot.Client();
    this.bot.login(config.token);
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
