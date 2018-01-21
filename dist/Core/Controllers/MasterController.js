"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordController_1 = require("./DiscordController");
const TelegramController_1 = require("./TelegramController");
const TwitchController_1 = require("./TwitchController");
const ramda_1 = require("ramda");
const Commands_1 = require("../Commands");
class MasterController {
    constructor(config) {
        this.commands = new Map();
        this.discordBot = new DiscordController_1.default(config.tokens.discord, this);
        this.telegramBot = new TelegramController_1.default(config.tokens.telegram, this);
        this.twitchBot = new TwitchController_1.default(config.tokens.twitch, this);
        this.registerCommands();
    }
    onMessage(platform, content, msg) {
        console.log("Received message");
        const command = this.getCommand(content);
        if (!ramda_1.isEmpty(command.ref)) {
            if (this.userHasPermissions()) {
                console.log("Executing command: " + command.ref.name);
            }
        }
    }
    userHasPermissions() {
        return true;
    }
    getCommand(content) {
        let command = {
            ref: {
                name: "",
                help: "",
                permissions: [],
                platforms: [],
                execute: undefined
            },
            params: []
        };
        if (!ramda_1.isNil(content) && !ramda_1.isEmpty(content) && ramda_1.startsWith("!", content)) {
            const commandSplitted = ramda_1.split(" ", content);
            if (ramda_1.length(commandSplitted) > 0) {
                const commandName = ramda_1.toLower(ramda_1.takeLast(ramda_1.length(commandSplitted[0]) - ramda_1.length("!"), commandSplitted[0]));
                if (this.commands.has(commandName)) {
                    command.ref = this.commands.get(commandName);
                    command.params = ramda_1.tail(commandSplitted);
                }
            }
        }
        return command;
    }
    registerCommands() {
        ramda_1.forEach(category => ramda_1.forEach(command => this.commands.set(Commands_1.default[category][command].name, Commands_1.default[category][command]), ramda_1.keysIn(Commands_1.default[category])), ramda_1.keysIn(Commands_1.default));
    }
}
exports.default = MasterController;
//# sourceMappingURL=MasterController.js.map