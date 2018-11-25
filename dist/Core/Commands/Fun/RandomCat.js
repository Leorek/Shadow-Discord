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
    execute(controller, context, command) {
        Request("http://random.cat/meow")
            .then(res => {
            const cat = JSON.parse(res);
            controller.sendImage(context, cat.file);
        })
            .catch(err => {
            controller.sendMessage(context, "something_went_wrong");
        });
    }
}
exports.default = new RandomCatCommand();
//# sourceMappingURL=RandomCat.js.map