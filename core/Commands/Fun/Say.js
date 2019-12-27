"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SayCommand = /** @class */ (function () {
    function SayCommand() {
    }
    SayCommand.prototype.execute = function (platform, ctx, suffix, lang) {
        switch (platform) {
            case "discord":
                this.discord(ctx, suffix, lang);
                break;
            case "telegram":
                this.telegram(ctx, suffix, lang);
                break;
        }
    };
    SayCommand.prototype.discord = function (ctx, suffix, lang) {
        if (suffix.length <= 0) {
            ctx.reply("I can't say nothing :3");
        }
        else {
            ctx.channel.send(suffix, { tts: true });
        }
    };
    SayCommand.prototype.telegram = function (ctx, suffix, lang) {
        ctx.reply("Test!");
    };
    SayCommand.Name = "say";
    SayCommand.Help = "Repeats with tts!";
    SayCommand.Category = "Fun";
    SayCommand.Permissions = ["member"];
    SayCommand.Platforms = ["discord"];
    return SayCommand;
}());
exports.default = SayCommand;
