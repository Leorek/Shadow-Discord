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
        this.registerCommands();
        this.bot.startPolling();
    }
    registerCommands() {
        for (let group in this.commands) {
            console.log("Group: ");
            console.log(group);
            this.bot.command(this.commands[group].name, ctx => this.commands[group].execute("telegram", ctx));
        }
    }
}
exports.default = TelegramController;
//# sourceMappingURL=TelegramController.js.map