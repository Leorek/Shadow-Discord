"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import "./types/global.d";
const Lang = require("i18n");
const Controllers_1 = require("./Core/Controllers");
const config = require("./shadow.config.json");
class Shadow {
    constructor(config) {
        this.controllers = new Array();
        this.parseConfig(config);
        this.configureLanguage();
    }
    parseConfig(config) {
        console.log("Got this config ", config);
        if (config.clients && config.clients.length > 0) {
            console.log("Got enough clients");
            for (const clientConfig of config.clients) {
                console.log("Client config: ", clientConfig);
                switch (clientConfig.name) {
                    case "discord":
                        this.controllers.push(new Controllers_1.DiscordController(clientConfig, this));
                        break;
                    case "telegram":
                        console.log("Configuring telegram");
                        this.controllers.push(new Controllers_1.TelegramController(clientConfig));
                        break;
                    case "twitch":
                        this.controllers.push(new Controllers_1.TwitchController(clientConfig, this));
                        break;
                }
            }
        }
    }
    configureLanguage() {
        Lang.configure({
            directory: "./locales"
        });
    }
}
var bot = new Shadow(config);
// CommandManager.getInstance().loadCommands();
//# sourceMappingURL=index.js.map