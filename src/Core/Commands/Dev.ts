var Commands = [];

class DevCommand {
  public name = "ping";
  public help = "I'll reply to you with pong!";
  public permissions = ["member"];
  public platforms = ["discord"];

  public execute(platform, msg) {
    console.log("Executing " + this.name);
    console.log("Platform: " + platform);
    switch (platform) {
      case "discord":
        this.discord(msg);
        break;
    }
  }
  private discord(msg) {
    var initTime = new Date(msg.timestamp).valueOf();
    msg.reply("Pong!").then(m => {
      m.edit(
        "<@" +
          msg.author.id +
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

  execute(platform, msg, suffix, lang) {
    switch (platform) {
      case "discord":
        this.discord(msg, suffix, lang);
        break;
      case "telegram":
        this.telegram(msg, suffix, lang);
        break;
    }
  }

  discord(msg, suffix, lang) {
    msg.reply("Test!");
  }
  telegram(msg, suffix, lang) {
    msg.reply("Test!");
  }
}

export default { DevCommand: new DevCommand(), TestCommand: new TestCommand() };
