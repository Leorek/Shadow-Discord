"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var got_1 = require("got");
exports.default = new (/** @class */ (function () {
    function RandomCatCommand() {
        this.Name = "RandomCat";
        this.Help = "Sends a random picture or gif of cats.";
        this.Category = "Fun";
        this.Permissions = ["member"];
        this.Platforms = ["discord", "telegram"];
        this.execute = function (context, params) {
            got_1.default("http://aws.random.cat/meow")
                .then(function (res) {
                var cat = JSON.parse(res.body);
                context.sendImage(cat.file);
            })
                .catch(function (err) {
                context.sendMessage("something_went_wrong");
            });
        };
    }
    return RandomCatCommand;
}()))();
