var Commands = []

Commands.avatar = {
  name: 'avatar',
  help: "I'll reply with a link to your avatar!",
  fn: function (msg) {
    msg.reply('This is your avatar: ' + msg.author.avatarURL)
  }
}

exports.Commands = Commands
exports.Category = 'Utils'
