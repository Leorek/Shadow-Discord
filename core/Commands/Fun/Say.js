"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new (/** @class */ (function () {
    function SayCommand() {
        this.Name = "Say";
        this.Help = "Repeats what you say!";
        this.Category = "Fun";
        this.Permissions = ["member"];
        this.Platforms = ["discord", "telegram"];
    }
    SayCommand.prototype.execute = function (context, params) {
        if (params.length > 0) {
            var message = params.join(" ");
            context.sendMessage(message, true);
        }
        else {
            context.sendMessage("I can't say nothing :3", true);
        }
    };
    return SayCommand;
}()))();
