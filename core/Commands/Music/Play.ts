import MusicCore from "../../MusicCore";
import { isNil, isEmpty } from "ramda";

class PlayCommand {
  public name = "play";
  public help = "Searchs a song on youtube and adds it to the queue.";
  public permissions = ["member"];
  public platforms = ["discord"];

  public execute(controller, context, command) {
    if (isNil(context.member.voiceChannel)) {
      controller.sendMessage(context, "Not in voice channel");
    }
    if (isEmpty(command.params)) {
      controller.sendMessage(context, "music_nothing_specified");
    }

    if (MusicCore.queueFull(context.guild.id)) {
      controller.sendMessage(context, "music_max_queue_size_reached");
    }
    //MusicCore.play();
  }
}

export default new PlayCommand();
