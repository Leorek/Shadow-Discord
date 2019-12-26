"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordBot = require("discord.js");
const CommandManager_1 = require("../CommandManager");
class DiscordController {
    constructor(config, shared) {
        this.platform = "discord";
        this.prefix = "";
        this.onMessage = context => {
            // Check which command is
            const name = "";
            // Get params of command
            const params = {};
            // Execute command
            const command = CommandManager_1.CommandManager.getInstance().getCommand(this.platform, name);
            command.execute(new DiscordContext(context), params);
        };
        this.shared = shared;
        this.prefix = config.prefix;
        this.bot = new DiscordBot.Client();
        this.bot.login(config.token);
        this.setupEvents();
    }
    setupEvents() {
        this.bot.on("message", this.onMessage);
    }
}
exports.DiscordController = DiscordController;
class DiscordContext {
    constructor(context) {
        this.context = context;
    }
    getContent() {
        return this.context.content;
    }
    sendMessage(message) {
        this.context.channel.send(message);
    }
    sendImage(image) {
        this.context.channel.send(image);
    }
}
//# sourceMappingURL=DiscordController.js.map