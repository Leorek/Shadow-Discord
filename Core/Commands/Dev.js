var Commands = []

Commands.ping = {
  name: 'ping',
  help: "I'll reply to you with pong!",
  permissions: ['member'],
  fn: function (msg) {
    var initTime = new Date(msg.timestamp)
    msg.reply('Pong!').then((m) => {
      m.edit('<@' + msg.author.id + '>, Pong! Time taken: ' + Math.floor(new Date(m.timestamp) - initTime) + ' ms.')
    })
  }
}

Commands.test = {
  name: 'test',
  help: "I'll test whatever you want!",
  permissions: ['member'],
  fn: function (msg, suffix, lang) {
    msg.reply(lang.__('hello'))
    lang.setLocale('es')
    msg.reply(lang.__('hello'))
    lang.setLocale('en')
  }
}

exports.Commands = Commands
exports.Category = 'Dev'
