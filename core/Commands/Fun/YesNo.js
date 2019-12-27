"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request = require("request-promise");
var YesNoCommand = /** @class */ (function () {
    function YesNoCommand() {
    }
    YesNoCommand.prototype.execute = function (controller, context, command) {
        Request("https://yesno.wtf/api/")
            .then(function (res) {
            var yesno = JSON.parse(res);
            controller.sendImage(context, yesno.image);
        })
            .catch(function (err) {
            controller.sendMessage(context, "something_went_wrong");
        });
    };
    YesNoCommand.Name = "yesno";
    YesNoCommand.Help = "Sends a random gif or picture with yes or no";
    YesNoCommand.Category = "Fun";
    YesNoCommand.Permissions = ["member"];
    YesNoCommand.Platforms = ["discord", "telegram"];
    return YesNoCommand;
}());
exports.default = YesNoCommand;
