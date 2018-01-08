"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Commands = [];
class DevCommand {
    constructor() {
        this.name = "ping";
        this.help = "I'll reply to you with pong!";
        this.permissions = ["member"];
        this.platforms = ["discord"];
    }
    execute(platform, msg) {
        console.log("Executing " + this.name);
        console.log("Platform: " + platform);
        switch (platform) {
            case "discord":
                this.discord(msg);
                break;
        }
    }
    discord(msg) {
        var initTime = new Date(msg.timestamp).valueOf();
        msg.reply("Pong!").then(m => {
            m.edit("<@" +
                msg.author.id +
                ">, Pong! Time taken: " +
                Math.floor(new Date(m.timestamp).valueOf() - initTime) +
                " ms.");
        });
    }
}
class TestCommand {
    constructor() {
        this.name = "test";
        this.help = "I'll test whatever you want!";
        this.permissions = ["member"];
        this.platforms = ["telegram"];
    }
    execute(platform, msg, suffix, lang) {
        switch (platform) {
            case "discord":
                this.discord(msg, suffix, lang);
                break;
            case "telegram":
                this.telegram(msg, suffix, lang);
                break;
        }
    }
    discord(msg, suffix, lang) {
        msg.reply("Test!");
    }
    telegram(msg, suffix, lang) {
        msg.reply("Test!");
    }
}
exports.default = { DevCommand: new DevCommand(), TestCommand: new TestCommand() };
//# sourceMappingURL=Dev.js.map