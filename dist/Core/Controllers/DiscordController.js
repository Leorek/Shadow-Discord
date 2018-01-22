"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordBot = require("discord.js");
class DiscordController {
    constructor(token, lang, master) {
        this.platform = "discord";
        this.master = master;
        this.bot = new DiscordBot.Client();
        this.bot.login(token);
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
        // lang.__("something_went_wrong")
        context.channel.send(message);
    }
    sendImage(context, image) {
        context.channel.send(image);
    }
}
exports.default = DiscordController;
//# sourceMappingURL=DiscordController.js.map