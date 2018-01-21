"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require("node-telegram-bot-api");
class TelegramController {
    constructor(token, master) {
        this.master = master;
        this.bot = new TelegramBot(token, { polling: true });
        this.setUpEvents();
    }
    setUpEvents() {
        this.bot.on("message", msg => {
            this.master.onMessage("telegram", this.getContent(msg), msg);
        });
    }
    getContent(msg) {
        return msg.text;
    }
}
exports.default = TelegramController;
//# sourceMappingURL=TelegramController.js.map