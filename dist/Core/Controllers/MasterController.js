"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lang = require("i18n");
const DiscordController_1 = require("./DiscordController");
const TelegramController_1 = require("./TelegramController");
const TwitchController_1 = require("./TwitchController");
const ramda_1 = require("ramda");
const RD = require("require-directory");
const AllCommands = RD(module, "../Commands");
class MasterController {
    constructor(config) {
        this.commands = new Map();
        this.discordBot = new DiscordController_1.default(config.tokens.discord, this);
        this.telegramBot = new TelegramController_1.default(config.tokens.telegram, this);
        this.twitchBot = new TwitchController_1.default(config.tokens.twitch, this);
        this.registerCommands();
        this.configureLanguage();
    }
    onMessage(controller, context) {
        const command = this.getCommand(controller.getContent(context));
        if (!ramda_1.isEmpty(command.ref.name)) {
            if (this.userHasPermissions()) {
                command.ref.execute(controller, context, command, Lang, this);
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
        console.log(AllCommands);
        ramda_1.forEach(category => {
            console.log(category);
            ramda_1.forEach(command => {
                console.log(command);
                this.commands.set(AllCommands[category][command].default.name, AllCommands[category][command].default);
            }, ramda_1.keysIn(AllCommands[category]));
        }, ramda_1.keysIn(AllCommands));
        console.log(this.commands);
    }
    configureLanguage() {
        Lang.configure({
            directory: "./Locales"
        });
    }
}
exports.default = MasterController;
//# sourceMappingURL=MasterController.js.map