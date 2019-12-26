// import "./types/global.d";
import * as Lang from "i18n";
import {
    DiscordController,
    TelegramController,
    TwitchController
} from "./Core/Controllers";

import * as config from "./shadow.config.json";

import { CommandManager } from "./core/CommandManager"

class Shadow {
    private controllers = new Array<Controller>();

    constructor(config) {
        this.parseConfig(config);
        this.configureLanguage();
    }

    parseConfig(config) {
        console.log("Got this config ", config);
        if (config.clients && config.clients.length > 0) {
            console.log("Got enough clients");
            for (const clientConfig of config.clients) {
                console.log("Client config: ", clientConfig)
                switch (clientConfig.name) {
                    case "discord":
                        this.controllers.push(
                            new DiscordController(clientConfig, this)
                        );
                        break;
                    case "telegram":
                        console.log("Configuring telegram");
                        this.controllers.push(
                            new TelegramController(clientConfig)
                        );
                        break;
                    case "twitch":
                        this.controllers.push(
                            new TwitchController(clientConfig, this)
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

// CommandManager.getInstance().loadCommands();