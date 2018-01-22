"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require("node-telegram-bot-api");
const Utils_1 = require("../Utils");
class TelegramController {
    constructor(token, lang, master) {
        this.master = master;
        this.bot = new TelegramBot(token, { polling: true });
        this.lang = lang;
        this.setUpEvents();
    }
    setUpEvents() {
        this.bot.on("message", msg => {
            this.master.onMessage(this, msg);
        });
    }
    getContent(msg) {
        return msg.text;
    }
    sendMessage(context, message) {
        // lang.__("something_went_wrong")
        this.bot.sendMessage(context.chat.id, message);
    }
    sendImage(context, image) {
        if (Utils_1.isGif(image)) {
            this.bot.sendDocument(context.chat.id, image);
        }
        else {
            this.bot.sendPhoto(context.chat.id, image);
        }
    }
}
exports.default = TelegramController;
//# sourceMappingURL=TelegramController.js.map