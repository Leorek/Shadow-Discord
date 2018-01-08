"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require("telegraf");
class TelegramController {
    constructor(token, commands) {
        this.bot = new TelegramBot(token);
        this.commands = commands;
        this.bot.start(ctx => {
            console.log("started:", ctx.from.id);
            return ctx.reply("Welcome!");
        });
        this.bot.startPolling();
    }
}
exports.default = TelegramController;
//# sourceMappingURL=TelegramController.js.map