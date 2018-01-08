"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require("request");
class SayCommand {
    constructor() {
        this.name = "say";
        this.help = "Repeats with tts!";
        this.permissions = ["member"];
        this.platforms = ["discord"];
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
        if (suffix.length <= 0) {
            ctx.reply("I can't say nothing :3");
        }
        else {
            ctx.channel.send(suffix, { tts: true });
        }
    }
    telegram(ctx, suffix, lang) {
        ctx.reply("Test!");
    }
}
class RandomCatCommand {
    constructor() {
        this.name = "randomcat";
        this.help = "Sends a random picture or gif of cats.";
        this.permissions = ["member"];
        this.platforms = ["discord", "telegram"];
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
        Request("http://random.cat/meow", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                try {
                    JSON.parse(body);
                }
                catch (e) {
                    ctx.channel.send(lang.__("bad_answer_from_api"));
                    return;
                }
                var cat = JSON.parse(body);
                ctx.channel.send(cat.file);
            }
            else {
                ctx.channel.send(lang.__("something_went_wrong"));
            }
        });
    }
    telegram(ctx, suffix, lang) {
        Request("http://random.cat/meow", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                try {
                    JSON.parse(body);
                }
                catch (e) {
                    ctx.reply("Bad answer from api");
                    return;
                }
                var cat = JSON.parse(body);
                ctx.replyWithPhoto(cat.file);
            }
            else {
                ctx.channel.send("Something went wrong");
            }
        });
    }
}
exports.default = {
    SayCommand: new SayCommand(),
    RandomCatCommand: new RandomCatCommand()
};
//# sourceMappingURL=Fun.js.map