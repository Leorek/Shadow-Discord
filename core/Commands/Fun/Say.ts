export default class SayCommand {
  public static Name = "say";
  public static Help = "Repeats with tts!";
  public static Category = "Fun";
  public static Permissions = ["member"];
  public static Platforms = ["discord"];

  execute(platform, ctx, suffix, lang) {
    switch (platform) {
      case "discord":
        this.discord(ctx, suffix, lang);
        break;
      case "telegram":
        this.telegram(ctx, suffix, lang);
        break;
    }
  }

  discord(ctx, suffix, lang) {
    if (suffix.length <= 0) {
      ctx.reply("I can't say nothing :3");
    } else {
      ctx.channel.send(suffix, { tts: true });
    }
  }
  telegram(ctx, suffix, lang) {
    ctx.reply("Test!");
  }
}
