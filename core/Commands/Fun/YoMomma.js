"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var got_1 = require("got");
exports.default = new (/** @class */ (function () {
    function YoMommaCommand() {
        this.Name = "yomomma";
        this.Help = "Sends a random joke about ur mum.";
        this.Category = "Fun";
        this.Permissions = ["member"];
        this.Platforms = ["discord", "telegram"];
    }
    YoMommaCommand.prototype.execute = function (context, params) {
        got_1.default("http://api.yomomma.info/")
            .then(function (res) {
            var yomomma = JSON.parse(res.body);
            context.sendMessage(yomomma.joke);
        })
            .catch(function (err) {
            context.sendMessage("something_went_wrong");
        });
    };
    return YoMommaCommand;
}()))();
