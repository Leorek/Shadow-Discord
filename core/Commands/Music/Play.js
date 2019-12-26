"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import MusicCore from "../../MusicCore";
const ramda_1 = require("ramda");
class PlayCommand {
    execute(controller, context, command) {
        if (ramda_1.isNil(context.member.voiceChannel)) {
            controller.sendMessage(context, "Not in voice channel");
        }
        if (ramda_1.isEmpty(command.params)) {
            controller.sendMessage(context, "music_nothing_specified");
        }
        // if (MusicCore.queueFull(context.guild.id)) {
        //   controller.sendMessage(context, "music_max_queue_size_reached");
        // }
        //MusicCore.play();
    }
}
exports.default = PlayCommand;
PlayCommand.Name = "play";
PlayCommand.Help = "Searchs a song on youtube and adds it to the queue.";
PlayCommand.Category = "Music";
PlayCommand.Permissions = ["member"];
PlayCommand.Platforms = ["discord"];
//# sourceMappingURL=Play.js.map