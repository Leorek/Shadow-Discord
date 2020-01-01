// import MusicCore from "../../MusicCore";
import { isEmpty } from "ramda";

export default new (class PlayCommand {
  public Name = "play";
  public Help = "Searchs a song on youtube and adds it to the queue.";
  public Category = "Music";
  public Permissions = ["member"];
  public Platforms = ["discord"];

  public execute(context, params) {
    if (context.getVoiceChannel()) {
      context.sendMessage(context, "Not in voice channel");
    }
    if (isEmpty(command.params)) {
      context.sendMessage(context, "music_nothing_specified");
    }

    // if (MusicCore.queueFull(context.guild.id)) {
    //   controller.sendMessage(context, "music_max_queue_size_reached");
    // }
    //MusicCore.play();
  }
})();
