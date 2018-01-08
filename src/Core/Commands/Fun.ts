var Commands = [];
var Request = require("request");

class SayCommand {
  public name = "say";
  public help = "Repeats with tts!";
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

Commands.randomcat = {
  name: "randomcat",
  help: "Sends a random picture or gif of cats.",
  permissions: ["member"],
  fn: function(msg, suffix, lang) {
    Request("http://random.cat/meow", function(error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body);
        } catch (e) {
          msg.channel.send(lang.__("bad_answer_from_api"));
          return;
        }
        var cat = JSON.parse(body);
        msg.channel.send(cat.file);
      } else {
        msg.channel.send(lang.__("something_went_wrong"));
      }
    });
  }
};

Commands.randomdog = {
  name: "randomdog",
  help: "Sends a random picture or gif of doggies.",
  permissions: ["member"],
  fn: function(msg, suffix, lang) {
    const baseUrl = "https://dog.ceo/api/";

    if (suffix) {
      if (suffix === "list") {
        Request(baseUrl + "breeds/list", function(error, response, body) {
          if (!error && response.statusCode === 200) {
            try {
              JSON.parse(body);
            } catch (e) {
              msg.channel.send(format(lang.__("bad_answer_from_api")));
              return;
            }
            var dog = JSON.parse(body);
            var breedList = dog.message;

            msg.channel.send({
              embed: {
                color: 2645853,
                author: {
                  name: "Shadow player",
                  icon_url:
                    "http://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/512/Music-icon.png"
                },
                description: lang.__("dog_breeds_available"),
                fields: [
                  {
                    name: ":dog:",
                    value: breedList.splice(0, breedList.length / 2).join("\n"),
                    inline: true
                  },
                  {
                    name: ":dog:",
                    value: breedList.join("\n"),
                    inline: true
                  }
                ]
              }
            });
          } else {
            msg.channel.send(format(lang.__("something_went_wrong")));
          }
        });
      } else {
        Request(baseUrl + "breed/" + suffix + "/images/random", function(
          error,
          response,
          body
        ) {
          if (!error && response.statusCode === 200) {
            try {
              JSON.parse(body);
            } catch (e) {
              msg.channel.send(format(lang.__("bad_answer_from_api")));
              return;
            }
            var dog = JSON.parse(body);
            if (dog.status === "error") {
              msg.channel.send(format(lang.__("dog_breed_not_found")));
            } else {
              msg.channel.send(dog.message);
            }
          } else {
            msg.channel.send(format(lang.__("something_went_wrong")));
          }
        });
      }
    } else {
      Request(baseUrl + "breeds/image/random", function(error, response, body) {
        if (!error && response.statusCode === 200) {
          try {
            JSON.parse(body);
          } catch (e) {
            msg.channel.send(format(lang.__("bad_answer_from_api")));
            return;
          }
          var dog = JSON.parse(body);
          msg.channel.send(dog.message);
        } else {
          msg.channel.send(format(lang.__("something_went_wrong")));
        }
      });
    }
  }
};

Commands.yesno = {
  name: "yesno",
  help: "Sends a random gif or picture with yes or no",
  permissions: ["member"],
  fn: function(msg, suffix, lang) {
    Request("https://yesno.wtf/api/", function(error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body);
        } catch (e) {
          msg.channel.send(format(lang.__("bad_answer_from_api")));
          return;
        }
        var yesno = JSON.parse(body);
        msg.channel.send(yesno.image);
      } else {
        msg.channel.send(format(lang.__("something_went_wrong")));
      }
    });
  }
};

Commands.yomomma = {
  name: "yomomma",
  help: "Sends a random joke about ur mum.",
  permissions: ["member"],
  fn: function(msg, suffix, lang) {
    Request("http://api.yomomma.info/", function(error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body);
        } catch (e) {
          msg.channel.send(format(lang.__("bad_answer_from_api")));
          return;
        }
        var yomomma = JSON.parse(body);
        msg.channel.send(yomomma.joke);
      } else {
        msg.channel.send(format(lang.__("something_went_wrong")));
      }
    });
  }
};

function format(info) {
  return {
    embed: {
      color: 2645853,
      author: {
        name: "Shadow player",
        icon_url:
          "http://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/512/Music-icon.png"
      },
      fields: [
        {
          name: "Info",
          value: info
        }
      ]
    }
  };
}

export default { DevCommand: new DevCommand(), TestCommand: new TestCommand() };
