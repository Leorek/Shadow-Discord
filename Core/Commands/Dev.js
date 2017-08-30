var Commands = []

Commands.ping = {
  name: 'ping',
  help: "I'll reply to you with pong!",
  fn: function (msg) {
    var initTime = new Date(msg.timestamp)
    msg.reply('Pong!').then((m) => {
      m.edit('<@' + msg.author.id + '>, Pong! Time taken: ' + Math.floor(new Date(m.timestamp) - initTime) + ' ms.')
    })
  }
}

exports.Commands = Commands
exports.Category = "Dev"