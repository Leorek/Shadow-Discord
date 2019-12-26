"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SayCommand {
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
exports.default = SayCommand;
SayCommand.Name = "say";
SayCommand.Help = "Repeats with tts!";
SayCommand.Category = "Fun";
SayCommand.Permissions = ["member"];
SayCommand.Platforms = ["discord"];
//# sourceMappingURL=Say.js.map