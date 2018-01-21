import * as Request from "request-promise";

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

class RandomCatCommand {
  public name = "randomcat";
  public help = "Sends a random picture or gif of cats.";
  public permissions = ["member"];
  public platforms = ["discord", "telegram"];

  execute(command, platform, context, lang, master) {
    switch (platform) {
      case "discord":
        this.discord(command, context, lang);
        break;
      case "telegram":
        this.telegram(command, context, lang);
        break;
    }
  }

  private discord(command, ctx, lang) {
    this.common()
      .then(res => {
        const cat = JSON.parse(res);
        ctx.channel.send(cat.file);
      })
      .catch(err => {
        ctx.channel.send(lang.__("something_went_wrong"));
      });
  }

  private telegram(command, context, lang) {
    this.common()
      .then(res => {
        const cat = JSON.parse(res);
        if (this.isGif(cat.file)) {
          context.replyWithDocument(cat.file);
        } else {
          context.replyWithPhoto(cat.file);
        }
      })
      .catch(err => {
        context.reply(lang.__("something_went_wrong"));
      });
  }

  common() {
    return Request("http://random.cat/meow");
  }

  isGif(file) {
    const gifValidator = new RegExp("(.*?).(gif)$");
    console.log("Is gif: " + gifValidator.test(file));
    return gifValidator.exec(file);
  }
}

export default {
  SayCommand: new SayCommand(),
  RandomCatCommand: new RandomCatCommand()
};
