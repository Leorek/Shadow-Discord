"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require("node-telegram-bot-api");
const CommandManager_1 = require("../CommandManager");
const Utils_1 = require("../Utils");
class TelegramController {
    constructor(config) {
        this.platform = "telegram";
        this.prefix = "";
        this.onMessage = context => {
            console.log("Received new message", context);
            const text = context.text;
            if (text.startsWith(this.prefix)) {
                // Check which command is
                const name = this.getCommandName(text);
                // Get params of command
                const params = {};
                // Execute command
                const command = CommandManager_1.CommandManager.getInstance().getCommand(this.platform, name);
                command.execute(new TelegramContext(this.bot, context), params);
            }
        };
        this.prefix = config.defaultPrefix;
        this.bot = new TelegramBot(config.token, { polling: true });
        this.setUpEvents();
    }
    setUpEvents() {
        this.bot.on("text", this.onMessage);
        this.bot.on("error", error => {
            console.log("I had an error", error);
        });
    }
    getCommandName(text) {
        const textSplit = text.split(" ");
        return textSplit[0].substr(1); // In order to remove the prefix
    }
}
exports.TelegramController = TelegramController;
class TelegramContext {
    constructor(bot, context) {
        this.bot = bot;
        this.context = context;
    }
    getContent() {
        return this.context.text;
    }
    getUserId() {
        return this.context.from.id;
    }
    sendMessage(message) {
        this.bot.sendMessage(this.context.chat.id, message);
    }
    sendImage(image) {
        if (Utils_1.isGif(image)) {
            this.bot.sendDocument(this.context.chat.id, image);
        }
        else {
            this.bot.sendPhoto(this.context.chat.id, image);
        }
    }
}
//# sourceMappingURL=TelegramController.js.map