// import MusicCore from "../../MusicCore";
import { isNil, isEmpty } from "ramda";

export default class PlayCommand {
  public static Name = "play";
  public static Help = "Searchs a song on youtube and adds it to the queue.";
  public static Category = "Music";
  public static Permissions = ["member"];
  public static Platforms = ["discord"];

  public execute(controller, context, command) {
    if (isNil(context.member.voiceChannel)) {
      controller.sendMessage(context, "Not in voice channel");
    }
    if (isEmpty(command.params)) {
      controller.sendMessage(context, "music_nothing_specified");
    }

    // if (MusicCore.queueFull(context.guild.id)) {
    //   controller.sendMessage(context, "music_max_queue_size_reached");
    // }
    //MusicCore.play();
  }
}
