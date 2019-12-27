"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import "./types/global.d";
var Lang = require("i18n");
var Controllers_1 = require("./Core/Controllers");
var config = require("./shadow.config.json");
var controllers = new Array();
if (config.clients && config.clients.length > 0) {
    for (var _i = 0, _a = config.clients; _i < _a.length; _i++) {
        var clientConfig = _a[_i];
        switch (clientConfig.name) {
            case "discord":
                controllers.push(new Controllers_1.DiscordController(clientConfig, this));
                break;
            case "telegram":
                controllers.push(new Controllers_1.TelegramController(clientConfig));
                break;
            case "twitch":
                controllers.push(new Controllers_1.TwitchController(clientConfig, this));
                break;
        }
    }
}
Lang.configure({
    directory: "./locales"
});
