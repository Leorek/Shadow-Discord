"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request = require("request-promise");
exports.default = new /** @class */ (function () {
    function RandomCatCommand() {
        this.Name = "RandomCat";
        this.Help = "Sends a random picture or gif of cats.";
        this.Category = "Fun";
        this.Permissions = ["member"];
        this.Platforms = ["discord", "telegram"];
        this.execute = function (context, params) {
            console.log("Executing randomcat command");
            Request("http://aws.random.cat/meow")
                .then(function (res) {
                var cat = JSON.parse(res);
                context.sendImage(cat.file);
            })
                .catch(function (err) {
                context.sendMessage("something_went_wrong");
            });
            return "hola";
        };
    }
    return RandomCatCommand;
}());
