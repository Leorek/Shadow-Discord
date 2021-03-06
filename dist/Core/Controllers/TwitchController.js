"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TwitchBot = require("tmi.js");
class TwitchController {
    constructor(config, lang, master) {
        this.prefix = "";
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
            if (self)
                return;
            this.master.onMessage("twitch", message);
        });
    }
    getContent(msg) {
        return msg.content;
    }
}
exports.default = TwitchController;
//# sourceMappingURL=TwitchController.js.map