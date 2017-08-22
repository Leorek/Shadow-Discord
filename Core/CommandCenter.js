'use strict'

var directory = require('require-directory');

var Commands = directory(module, './Commands');
var FunctionalCommands = []

for (var group in Commands) {
  for (var command in Commands[group].Commands) {
    FunctionalCommands[command] = Commands[group].Commands[command];
  }
}

exports.helpHandle = function (msg, suffix) {
  var sorts = {
    0: [
      '[Available commands]\n'
    ]
  }
  let counter = 0
  if (!suffix) {
    for (var index in FunctionalCommands) {
        if (sorts[counter].join('\n').length > 1750) {
          counter++
          sorts[counter] = []
        }
        sorts[counter].push(index + ' = "' + FunctionalCommands[index].help + '"')
    }
    var misc = [
      'If you want more information on the commands, check the command reference at http://shadowbot.github.io/commands.',
      'For further questions, join our server: https://discord.gg/RjfxeP5'
    ]
    msg.author.createDM().then((y) => {
      if (!msg.isPrivate) {
        msg.channel.send('Help is underway ' + msg.author.username + '!')
      }
      for (var r in sorts) {
        y.send(`\`\`\`ini\n${sorts[r].sort().join('\n')}\n\`\`\``) // FIXME: The entire commands array should sort instead of the sorts one
      }
      y.send(misc.join('\n'))
    }).catch((e) => {
      //Logger.error(e)
      msg.channel.send('Well, this is awkward, something went wrong while trying to PM you. Do you have them enabled on this server?')
    })
  } else if (suffix) {
    if (FunctionalCommands[suffix]) {
      var c = FunctionalCommands[suffix];
      var attributes = []
      var name
      for (var x in FunctionalCommands) {
        if (FunctionalCommands[x] === c) {
          name = x
          break
        }
      }
      var def = [
        `Command name: \`${name}\``,
        `What this does: \`${c.help}\``,
        'Example:',
        '```',
        `${(c.usage) ? config.settings.prefix + name + ' ' + c.usage : config.settings.prefix + name}`,
        '```',
        `**Required access level**: ${c.level}`,
        `${(c.aliases) ? '**Aliases for this command**: ' + c.aliases.join(', ') + '\n' : ''}`
      ]
      for (var attribute in c) {
        switch (attribute) {
          case 'noDM': {
            if (c[attribute] === true) attributes.push('*This command cannot be used in DMs.*')
            break
          }
          case 'hidden': {
            if (c[attribute] === true) attributes.push('*This is a hidden command.*')
            break
          }
          case 'nsfw': {
            if (c[attribute] === true) attributes.push('*This command is NSFW*')
            break
          }
          case 'timeout': {
            attributes.push(`*This command has a timeout of ${c.timeout} seconds*`)
            break
          }
        }
      }

      msg.author.createDM().then((y) => {
        y.send(def.join('\n') + attributes.join('\n'))
      })
    } else {
      msg.channel.send(`There is no **${suffix}** command!`)
    }
  }
}

exports.Commands = FunctionalCommands