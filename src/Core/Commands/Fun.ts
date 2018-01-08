import * as Request from "request";

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
    Request("http://random.cat/meow", function(error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body);
        } catch (e) {
          ctx.channel.send(lang.__("bad_answer_from_api"));
          return;
        }
        var cat = JSON.parse(body);
        ctx.channel.send(cat.file);
      } else {
        ctx.channel.send(lang.__("something_went_wrong"));
      }
    });
  }
  telegram(ctx, suffix, lang) {
    Request("http://random.cat/meow", function(error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body);
        } catch (e) {
          ctx.reply("Bad answer from api");
          return;
        }
        var cat = JSON.parse(body);
        ctx.replyWithPhoto(cat.file);
      } else {
        ctx.channel.send("Something went wrong");
      }
    });
  }
  common(){
    return new Promise( resolve, reject){
      
    }
    Request("http://random.cat/meow", function(error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body);
        } catch (e) {
          ctx.reply("Bad answer from api");
          return;
        }
        var cat = JSON.parse(body);
        ctx.replyWithPhoto(cat.file);
      } else {
        ctx.channel.send("Something went wrong");
      }
    });
  }
}

export default {
  SayCommand: new SayCommand(),
  RandomCatCommand: new RandomCatCommand()
};
