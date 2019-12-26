"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InviteCommand {
    execute(controller, context, command) {
        context.generateInvite().then(invite => {
            controller.sendMessage(context, invite);
        });
    }
}
exports.default = InviteCommand;
InviteCommand.Name = "invite";
InviteCommand.Help = "Generates a link to invite Shadow to your server.";
InviteCommand.Permissions = ["member"];
InviteCommand.Platforms = ["discord"];
//# sourceMappingURL=Invite.js.map