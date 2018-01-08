"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const Logger_1 = require("../Logger");
let Client = new Discord.Client();
Client.on("ready", () => {
    Logger_1.default.info("Shadow is up and ready.");
});
//# sourceMappingURL=Discord.js.map