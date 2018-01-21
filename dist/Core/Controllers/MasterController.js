"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordController_1 = require("./DiscordController");
const TelegramController_1 = require("./TelegramController");
const ramda_1 = require("ramda");
const Commands_1 = require("../Commands");
class MasterController {
    constructor(config) {
        this.discordBot = new DiscordController_1.default(config.tokens.discord, this);
        this.telegramBot = new TelegramController_1.default(config.tokens.telegram, this);
    }
    onMessage(platform, content, msg) {
        console.log("Received message");
        const command = this.getCommand(content);
        if (this.isAvailableFor(platform, command.name)) {
            // See if user has permissions
            if (this.userHasPermissions()) {
                // Execute command
            }
        }
    }
    getCommand(content) {
        let command = {
            name: "",
            params: []
        };
        if (!ramda_1.isNil(content) && !ramda_1.isEmpty(content) && ramda_1.startsWith("!", content)) {
            const commandSplitted = ramda_1.split(" ", content);
            if (ramda_1.length(commandSplitted) > 0) {
                command.name = ramda_1.toLower(ramda_1.takeLast(ramda_1.length(commandSplitted[0]) - ramda_1.length("!"), commandSplitted[0]));
                command.params = ramda_1.tail(commandSplitted);
            }
        }
        return command;
    }
    isAvailableFor(platform, command) {
        console.log(Commands_1.default);
        return true;
    }
    userHasPermissions() {
        return true;
    }
}
exports.default = MasterController;
//# sourceMappingURL=MasterController.js.map