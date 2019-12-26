"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require("request-promise");
class YesNoCommand {
    execute(controller, context, command) {
        Request("https://yesno.wtf/api/")
            .then(res => {
            var yesno = JSON.parse(res);
            controller.sendImage(context, yesno.image);
        })
            .catch(err => {
            controller.sendMessage(context, "something_went_wrong");
        });
    }
}
exports.default = YesNoCommand;
YesNoCommand.Name = "yesno";
YesNoCommand.Help = "Sends a random gif or picture with yes or no";
YesNoCommand.Category = "Fun";
YesNoCommand.Permissions = ["member"];
YesNoCommand.Platforms = ["discord", "telegram"];
//# sourceMappingURL=YesNo.js.map