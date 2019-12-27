"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request = require("request-promise");
var YoMommaCommand = /** @class */ (function () {
    function YoMommaCommand() {
    }
    YoMommaCommand.prototype.execute = function (controller, context, command) {
        Request("http://api.yomomma.info/")
            .then(function (res) {
            var yomomma = JSON.parse(res);
            controller.sendMessage(context, yomomma.joke);
        })
            .catch(function (err) {
            controller.sendMessage(context, "something_went_wrong");
        });
    };
    YoMommaCommand.Name = "yomomma";
    YoMommaCommand.Help = "Sends a random joke about ur mum.";
    YoMommaCommand.Category = "Fun";
    YoMommaCommand.Permissions = ["member"];
    YoMommaCommand.Platforms = ["discord", "telegram"];
    return YoMommaCommand;
}());
exports.default = YoMommaCommand;
