"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require("request-promise");
class RandomCatCommand {
    execute(context, command) {
        console.log("Executing randomcat command");
        Request("http://random.cat/meow")
            .then(res => {
            const cat = JSON.parse(res);
            context.sendImage(cat.file);
        })
            .catch(err => {
            context.sendMessage("something_went_wrong");
        });
    }
}
exports.default = RandomCatCommand;
RandomCatCommand.Name = "RandomDog";
RandomCatCommand.Help = "Sends a random picture or gif of cats.";
RandomCatCommand.Category = "Fun";
RandomCatCommand.Permissions = ["member"];
RandomCatCommand.Platforms = ["discord", "telegram"];
//# sourceMappingURL=RandomCat.js.map