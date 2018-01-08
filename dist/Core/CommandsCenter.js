"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("./Commands");
var Commands = [];
var DiscordCommands = [];
exports.DiscordCommands = DiscordCommands;
var TelegramCommands = [];
exports.TelegramCommands = TelegramCommands;
for (var group in Commands_1.default) {
    for (var commandKey in Commands_1.default[group]) {
        let command = Commands_1.default[group][commandKey];
        if (hasSupportFor("discord", commandKey)) {
            DiscordCommands[commandKey] = command;
        }
        if (hasSupportFor("telegram", commandKey)) {
            TelegramCommands[commandKey] = command;
        }
    }
}
function hasSupportFor(platform, command) {
    return Commands_1.default[group][command]["platforms"].indexOf(platform) > -1;
}
//# sourceMappingURL=CommandsCenter.js.map