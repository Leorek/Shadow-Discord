"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiscordBot = require("discord.js");
var CommandManager_1 = require("../CommandManager");
var DiscordController = /** @class */ (function () {
    function DiscordController(config, shared) {
        var _this = this;
        this.platform = "discord";
        this.prefix = "";
        this.onMessage = function (context) {
            // Check which command is
            var name = "";
            // Get params of command
            var params = {};
            // Execute command
            var command = _this.commands.getCommand(_this.platform, name);
            command.execute(new DiscordContext(context), params);
        };
        this.shared = shared;
        this.prefix = config.prefix;
        this.commands = new CommandManager_1.CommandManager(this.platform);
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
    DiscordContext.prototype.sendMessage = function (message) {
        this.context.channel.send(message);
    };
    DiscordContext.prototype.sendImage = function (image) {
        this.context.channel.send(image);
    };
    return DiscordContext;
}());
