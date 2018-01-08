"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require("telegraf");
class Telegram {
    constructor(token) {
        this.bot = new TelegramBot(token);
        this.bot.start(ctx => {
            console.log("started:", ctx.from.id);
            return ctx.reply("Welcome!");
        });
        this.bot.startPolling();
    }
}
exports.default = Telegram;
//# sourceMappingURL=Telegram.js.map