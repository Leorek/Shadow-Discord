Commands.randomdog = {
  name: "randomdog",
  help: "Sends a random picture or gif of doggies.",
  permissions: ["member"],
  fn: function(msg, suffix, lang) {
    const baseUrl = "https://dog.ceo/api/";
    {
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
