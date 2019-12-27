"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InviteCommand = /** @class */ (function () {
    function InviteCommand() {
    }
    InviteCommand.prototype.execute = function (controller, context, command) {
        context.generateInvite().then(function (invite) {
            controller.sendMessage(context, invite);
        });
    };
    InviteCommand.Name = "invite";
    InviteCommand.Help = "Generates a link to invite Shadow to your server.";
    InviteCommand.Permissions = ["member"];
    InviteCommand.Platforms = ["discord"];
    return InviteCommand;
}());
exports.default = InviteCommand;
