"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lang = require("i18n");
const ramda_1 = require("ramda");
const RD = require("require-directory");
const DiscordController_1 = require("./Core/Controllers/DiscordController");
const TelegramController_1 = require("./Core/Controllers/TelegramController");
const TwitchController_1 = require("./Core/Controllers/TwitchController");
const config = require("../config.json");
const AllCommands = RD(module, "./Core/Commands");
class Shadow {
    constructor(config) {
        this.commands = new Map();
        if (!ramda_1.isNil(config.discord) && !ramda_1.isEmpty(config.discord)) {
            this.discordBot = new DiscordController_1.default(config.discord, Lang, this);
        }
        else {
            console.log("Discord module is disabled. (Bad configuration?)");
        }
        if (!ramda_1.isNil(config.telegram) && !ramda_1.isEmpty(config.telegram)) {
            this.telegramBot = new TelegramController_1.default(config.telegram, Lang, this);
        }
        else {
            console.log("Telegram module is disabled. (Bad configuration?)");
        }
        if (!ramda_1.isNil(config.tokens.twitch) && !ramda_1.isEmpty(config.tokens.twitch)) {
            this.twitchBot = new TwitchController_1.default(config.tokens.twitch, Lang, this);
        }
        else {
            console.log("Twitch module is disabled. (Bad configuration?)");
        }
        this.registerCommands();
        this.configureLanguage();
    }
    onMessage(controller, context) {
        console.log("Received message: ");
        console.log(controller.getContent(context));
        const command = this.getCommand(controller, context);
        if (!ramda_1.isEmpty(command.ref.name)) {
            if (this.userHasPermissions()) {
                console.log("Executing command: " + command.ref.name);
                command.ref.execute(controller, context, command);
            }
        }
    }
    userHasPermissions() {
        return true;
    }
    getCommand(controller, context) {
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
        const content = controller.getContent(context);
        if (!ramda_1.isNil(content) &&
            !ramda_1.isEmpty(content) &&
            ramda_1.startsWith(controller.prefix, content)) {
            const commandSplitted = ramda_1.split(" ", content);
            if (ramda_1.length(commandSplitted) > 0) {
                const commandName = ramda_1.toLower(ramda_1.takeLast(ramda_1.length(commandSplitted[0]) - ramda_1.length(controller.prefix), commandSplitted[0]));
                if (this.commands.has(commandName)) {
                    command.ref = this.commands.get(commandName);
                    command.params = ramda_1.tail(commandSplitted);
                }
            }
        }
        return command;
    }
    registerCommands() {
        ramda_1.forEach(category => {
            ramda_1.forEach(command => {
                this.commands.set(AllCommands[category][command].default.name, AllCommands[category][command].default);
            }, ramda_1.keysIn(AllCommands[category]));
        }, ramda_1.keysIn(AllCommands));
    }
    configureLanguage() {
        Lang.configure({
            directory: "./Locales"
        });
    }
}
var bot = new Shadow(config);
//# sourceMappingURL=bot.js.map