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
