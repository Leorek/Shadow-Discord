import * as TwitchBot from "tmi.js";

export default class TwitchController {
  private bot;
  private master;

  constructor(config, master) {
    this.master = master;
    this.bot = new TwitchBot.client({
      identity: {
        username: config.username,
        password: config.password
      },
      channels: ["#leorek"]
    });
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
