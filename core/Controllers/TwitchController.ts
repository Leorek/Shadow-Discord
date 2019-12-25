import * as TwitchBot from "tmi.js";

export class TwitchController {
  private bot;
  private master;
  private lang;
  public prefix = "";

  constructor(config, lang, master) {
    this.master = master;
    this.prefix = config.prefix;
    this.bot = new TwitchBot.client({
      identity: {
        username: config.credentials.username,
        password: config.credentials.password
      },
      channels: ["#leorek"]
    });
    this.lang = lang;
    this.bot.connect();
    this.setupEvents();
  }

  setupEvents() {
    this.bot.on("message", (channel, userstate, message, self) => {
      if (self) return;

      this.master.onMessage("twitch", message);
    });
  }

  getContent(msg) {
    return msg.content;
  }
}
