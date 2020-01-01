"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiscordBot = require("discord.js");
var CommandManager_1 = require("../CommandManager");
var DiscordController = /** @class */ (function () {
    function DiscordController(config) {
        var _this = this;
        this.platform = "discord";
        this.prefix = "";
        this.onMessage = function (context) {
            var text = context.content;
            if (text.startsWith(_this.prefix)) {
                var textSplit = text.split(" ");
                // Check which command is
                var name_1 = textSplit[0].substr(1); // In order to remove the prefix
                // Get params of command
                var params = textSplit.length > 1 ? textSplit.slice(1) : [];
                // Execute command
                var command = _this.commands.getCommand(_this.platform, name_1);
                if (command) {
                    var commandContext = new DiscordContext(context);
                    command.execute(commandContext, params);
                }
            }
        };
        this.prefix = config.defaultPrefix;
        this.commands = new CommandManager_1.CommandManager(this.platform);
        this.commands.loadCommands();
        this.bot = new DiscordBot.Client();
        this.bot.login(config.token);
        this.setupEvents();
    }
    DiscordController.prototype.setupEvents = function () {
        this.bot.on("message", this.onMessage);
    };
    return DiscordController;
}());
exports.DiscordController = DiscordController;
var DiscordContext = /** @class */ (function () {
    function DiscordContext(context) {
        this.context = context;
    }
    DiscordContext.prototype.getContent = function () {
        return this.context.content;
    };
    DiscordContext.prototype.sendMessage = function (message, tts) {
        if (tts) {
            this.context.channel.send(message, { tts: true });
        }
        else {
            this.context.channel.send(message);
        }
    };
    DiscordContext.prototype.sendImage = function (image) {
        this.context.channel.send(image);
    };
    return DiscordContext;
}());
