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
    execute(platform, ctx) {
        switch (platform) {
            case "discord":
                this.discord(ctx);
                break;
        }
    }
    discord(ctx) {
        var initTime = new Date(ctx.timestamp).valueOf();
        ctx.reply("Pong!").then(m => {
            m.edit("<@" +
                ctx.author.id +
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
    execute(platform, ctx, suffix, lang) {
        switch (platform) {
            case "discord":
                this.discord(ctx, suffix, lang);
                break;
            case "telegram":
                this.telegram(ctx, suffix, lang);
                break;
        }
    }
    discord(ctx, suffix, lang) {
        ctx.reply("Test!");
    }
    telegram(ctx, suffix, lang) {
        ctx.reply("Test!");
    }
}
exports.default = { DevCommand: new DevCommand(), TestCommand: new TestCommand() };
//# sourceMappingURL=Dev.js.map