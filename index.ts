// import "./types/global.d";
import * as Lang from "i18n";
import {
    DiscordController,
    TelegramController,
    TwitchController
} from "./Core/Controllers";

import * as config from "./shadow.config.json";

const controllers = new Array<Controller>();

if (config.clients && config.clients.length > 0) {
    for (const clientConfig of config.clients) {
        switch (clientConfig.name) {
            case "discord":
                controllers.push(
                    new DiscordController(clientConfig, this)
                );
                break;
            case "telegram":
                controllers.push(
                    new TelegramController(clientConfig)
                );
                break;
            case "twitch":
                controllers.push(
                    new TwitchController(clientConfig, this)
                );
                break;
        }
    }
}
Lang.configure({
    directory: "./locales"
});