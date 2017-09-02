var Commands = []

Commands.avatar = {
  name: 'avatar',
  help: "I'll reply with a link to your avatar!",
  permissions: ['member'],
  fn: function (msg) {
    msg.reply('This is your avatar: ' + msg.author.avatarURL)
  }
}

exports.Commands = Commands
exports.Category = 'Utils'
