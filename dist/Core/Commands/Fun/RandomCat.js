"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require("request-promise");
class RandomCatCommand {
    constructor() {
        this.name = "randomcat";
        this.help = "Sends a random picture or gif of cats.";
        this.permissions = ["member"];
        this.platforms = ["discord", "telegram"];
    }
    execute(controller, context, command, lang, master) {
        switch (controller.platform) {
            case "discord":
                this.discord(command, context, lang);
                break;
            case "telegram":
                this.telegram(command, context, lang);
                break;
        }
    }
    discord(command, ctx, lang) {
        this.common()
            .then(res => {
            const cat = JSON.parse(res);
            ctx.channel.send(cat.file);
        })
            .catch(err => {
            ctx.channel.send(lang.__("something_went_wrong"));
        });
    }
    telegram(command, context, lang) {
        this.common()
            .then(res => {
            const cat = JSON.parse(res);
            if (this.isGif(cat.file)) {
                context.replyWithDocument(cat.file);
            }
            else {
                context.replyWithPhoto(cat.file);
            }
        })
            .catch(err => {
            context.reply(lang.__("something_went_wrong"));
        });
    }
    common() {
        return Request("http://random.cat/meow");
    }
    isGif(file) {
        const gifValidator = new RegExp("(.*?).(gif)$");
        console.log("Is gif: " + gifValidator.test(file));
        return gifValidator.exec(file);
    }
}
exports.default = RandomCatCommand;
//# sourceMappingURL=RandomCat.js.map