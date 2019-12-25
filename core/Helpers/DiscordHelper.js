function(msg, suffix, lang, botUser) {
    if (!suffix) {
      msg.author
        .createDM()
        .then(y => {
          if (!msg.isPrivate) {
            msg.channel.send("Help is underway " + msg.author.username + "!");
          }
          var fields = [];
          var groupCommands = [];
  
          for (var group in Commands) {
            for (command in Commands[group].Commands) {
              groupCommands.push(
                "**" + command + ":** " + Commands[group].Commands[command].help
              );
            }
  
            fields.push({
              name: Commands[group].Category,
              value: groupCommands.join("\n")
            });
            groupCommands = [];
          }
          var misc = [
            "If you want more information on the commands, check the command reference at http://shadowbot.github.io/commands.",
            "For further questions, join our server: https://discord.gg/RjfxeP5"
          ];
          y.send({
            embed: {
              color: 2645853,
              description: misc.join("\n"),
              author: {
                name: "Commands",
                icon_url: botUser.avatarURL
              },
              fields: fields
            }
          });
        })
        .catch(e => {
          // Logger.error(e)
          msg.channel.send(
            "Well, this is awkward, something went wrong while trying to PM you. Do you have them enabled on this server?"
          );
        });
    } else if (suffix) {
      if (FunctionalCommands[suffix]) {
        var c = FunctionalCommands[suffix];
        var attributes = [];
        var name;
        for (var x in FunctionalCommands) {
          if (FunctionalCommands[x] === c) {
            name = x;
            break;
          }
        }
        var def = [
          `Command name: \`${name}\``,
          `What this does: \`${c.help}\``,
          "Example:",
          "```",
          `${
            c.usage
              ? Config.settings.prefix + name + " " + c.usage
              : Config.settings.prefix + name
          }`,
          "```",
          `**Required access level**: ${c.level}`,
          `${
            c.aliases
              ? "**Aliases for this command**: " + c.aliases.join(", ") + "\n"
              : ""
          }`
        ];
        for (var attribute in c) {
          switch (attribute) {
            case "noDM": {
              if (c[attribute] === true)
                attributes.push("*This command cannot be used in DMs.*");
              break;
            }
            case "hidden": {
              if (c[attribute] === true)
                attributes.push("*This is a hidden command.*");
              break;
            }
            case "nsfw": {
              if (c[attribute] === true)
                attributes.push("*This command is NSFW*");
              break;
            }
            case "timeout": {
              attributes.push(
                `*This command has a timeout of ${c.timeout} seconds*`
              );
              break;
            }
          }
        }
  
        msg.author.createDM().then(y => {
          y.send(def.join("\n") + attributes.join("\n"));
        });
      } else {
        msg.channel.send(`There is no **${suffix}** command!`);
      }
    }
  };