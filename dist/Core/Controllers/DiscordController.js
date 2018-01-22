"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordBot = require("discord.js");
class DiscordController {
    constructor(token, master) {
        this.platform = "discord";
        this.master = master;
        this.bot = new DiscordBot.Client();
        this.bot.login(token);
        this.setupEvents();
    }
    setupEvents() {
        this.bot.on("message", msg => {
            this.master.onMessage(this, msg);
        });
    }
    getContent(msg) {
        return msg.content;
    }
}
exports.default = DiscordController;
//# sourceMappingURL=DiscordController.js.map