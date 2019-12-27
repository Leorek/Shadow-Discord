"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import MusicCore from "../../MusicCore";
var ramda_1 = require("ramda");
var PlayCommand = /** @class */ (function () {
    function PlayCommand() {
    }
    PlayCommand.prototype.execute = function (controller, context, command) {
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
    };
    PlayCommand.Name = "play";
    PlayCommand.Help = "Searchs a song on youtube and adds it to the queue.";
    PlayCommand.Category = "Music";
    PlayCommand.Permissions = ["member"];
    PlayCommand.Platforms = ["discord"];
    return PlayCommand;
}());
exports.default = PlayCommand;
