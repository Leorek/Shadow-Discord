"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TelegramBot = require("node-telegram-bot-api");
var CommandManager_1 = require("../CommandManager");
var Utils_1 = require("../Utils");
var TelegramController = /** @class */ (function () {
    function TelegramController(config) {
        var _this = this;
        this.platform = "telegram";
        this.prefix = "";
        this.onMessage = function (context) {
            var text = context.text;
            if (text.startsWith(_this.prefix)) {
                var textSplit = text.split(" ");
                // Check which command is
                var name_1 = textSplit[0].substr(1); // In order to remove the prefix
                // Get params of command
                var params = textSplit.length > 1 ? textSplit.slice(1) : [];
                // Execute command
                var command = _this.commands.getCommand(_this.platform, name_1);
                if (command) {
                    var commandContext = new TelegramContext(_this.bot, context);
                    command.execute(commandContext, params);
                }
            }
        };
        this.prefix = config.defaultPrefix;
        this.commands = new CommandManager_1.CommandManager(this.platform);
        this.commands.loadCommands();
        this.bot = new TelegramBot(config.token, { polling: true });
        this.setUpEvents();
    }
    TelegramController.prototype.setUpEvents = function () {
        this.bot.on("text", this.onMessage);
        this.bot.on("error", function (error) {
            console.log("I had an error", error);
        });
    };
    return TelegramController;
}());
exports.TelegramController = TelegramController;
var TelegramContext = /** @class */ (function () {
    function TelegramContext(bot, context) {
        this.bot = bot;
        this.context = context;
    }
    TelegramContext.prototype.getContent = function () {
        return this.context.text;
    };
    TelegramContext.prototype.getUserId = function () {
        return this.context.from.id;
    };
    TelegramContext.prototype.sendMessage = function (message) {
        this.bot.sendMessage(this.context.chat.id, message);
    };
    TelegramContext.prototype.sendImage = function (image) {
        if (Utils_1.isGif(image)) {
            this.bot.sendDocument(this.context.chat.id, image);
        }
        else {
            this.bot.sendPhoto(this.context.chat.id, image);
        }
    };
    return TelegramContext;
}());
