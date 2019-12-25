import "./types/global";
import * as Lang from "i18n";
import {
  DiscordController,
  TelegramController,
  TwitchController
} from "./Core/Controllers";

const config = require("../config.json");

class Shadow {
  private controllers = new Array<Controller>();

  constructor(config) {
    this.parseConfig(config);
    this.configureLanguage();
  }

  parseConfig(config) {
    if (config.clients && config.clients > 0) {
      for (const clientConfig of config.clients) {
        switch (clientConfig.name) {
          case "discord":
            this.controllers.push(
              new DiscordController(config.discord, Lang, this)
            );
            break;
          case "telegram":
            this.controllers.push(
              new TelegramController(config.telegram, Lang, this)
            );
            break;
          case "twitch":
            this.controllers.push(
              new TwitchController(config.twitch, Lang, this)
            );
            break;
        }
      }
    }
  }

  private configureLanguage() {
    Lang.configure({
      directory: "./locales"
    });
  }
}

var bot = new Shadow(config);
