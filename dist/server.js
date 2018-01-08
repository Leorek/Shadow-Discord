"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramController_1 = require("./Core/Controllers/TelegramController");
const CommandsCenter_1 = require("./Core/CommandsCenter");
let telegramToken = "393214262:AAGydy9itV4AFlLcsMGVnwb2ej9lk4bZyW0";
class Shadow {
    constructor() {
        this.telegram = new TelegramController_1.default(telegramToken, CommandsCenter_1.TelegramCommands);
    }
}
exports.default = Shadow;
var server = new Shadow();
//# sourceMappingURL=server.js.map