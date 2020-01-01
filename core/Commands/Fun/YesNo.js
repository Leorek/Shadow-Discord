"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var got_1 = require("got");
exports.default = new (/** @class */ (function () {
    function YesNoCommand() {
        this.Name = "yesno";
        this.Help = "Sends a random gif or picture with yes or no";
        this.Category = "Fun";
        this.Permissions = ["member"];
        this.Platforms = ["discord", "telegram"];
    }
    YesNoCommand.prototype.execute = function (context, params) {
        got_1.default("https://yesno.wtf/api/")
            .then(function (res) {
            var yesno = JSON.parse(res.body);
            context.sendImage(yesno.image);
        })
            .catch(function (err) {
            context.sendMessage("something_went_wrong");
        });
    };
    return YesNoCommand;
}()))();
