"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require("node-telegram-bot-api");
const Utils_1 = require("../Utils");
class TelegramController {
    constructor(config, lang, master) {
        this.prefix = "";
        this.master = master;
        this.prefix = config.prefix;
        this.bot = new TelegramBot(config.token, { polling: true });
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