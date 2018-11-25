"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordBot = require("discord.js");
class DiscordController {
    constructor(config, lang, master) {
        this.platform = "discord";
        this.prefix = "";
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
    getContent(msg) {
        return msg.content;
    }
    sendMessage(context, message) {
        context.channel.send(message);
    }
    sendImage(context, image) {
        context.channel.send(image);
    }
}
exports.default = DiscordController;
//# sourceMappingURL=DiscordController.js.map