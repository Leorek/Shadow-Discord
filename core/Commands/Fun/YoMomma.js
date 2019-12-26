"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require("request-promise");
class YoMommaCommand {
    execute(controller, context, command) {
        Request("http://api.yomomma.info/")
            .then(res => {
            var yomomma = JSON.parse(res);
            controller.sendMessage(context, yomomma.joke);
        })
            .catch(err => {
            controller.sendMessage(context, "something_went_wrong");
        });
    }
}
exports.default = YoMommaCommand;
YoMommaCommand.Name = "yomomma";
YoMommaCommand.Help = "Sends a random joke about ur mum.";
YoMommaCommand.Category = "Fun";
YoMommaCommand.Permissions = ["member"];
YoMommaCommand.Platforms = ["discord", "telegram"];
//# sourceMappingURL=YoMomma.js.map