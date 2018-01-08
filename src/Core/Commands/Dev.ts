var Commands = [];

class DevCommand {
  public name = "ping";
  public help = "I'll reply to you with pong!";
  public permissions = ["member"];
  public platforms = ["discord"];

  public execute(platform, ctx) {
    switch (platform) {
      case "discord":
        this.discord(ctx);
        break;
    }
  }
  private discord(ctx) {
    var initTime = new Date(ctx.timestamp).valueOf();
    ctx.reply("Pong!").then(m => {
      m.edit(
        "<@" +
          ctx.author.id +
          ">, Pong! Time taken: " +
          Math.floor(new Date(m.timestamp).valueOf() - initTime) +
          " ms."
      );
    });
  }
}

class TestCommand {
  public name = "test";
  public help = "I'll test whatever you want!";
  public permissions = ["member"];
  public platforms = ["telegram"];

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
    ctx.reply("Test!");
  }
  telegram(ctx, suffix, lang) {
    ctx.reply("Test!");
  }
}

export default { DevCommand: new DevCommand(), TestCommand: new TestCommand() };
