class SayCommand {
  public name = "say";
  public help = "Repeats with tts!";
  public permissions = ["member"];
  public platforms = ["discord"];

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
export default new SayCommand();
