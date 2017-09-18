var Commands = []

Commands.avatar = {
  name: 'avatar',
  help: "I'll reply with a link to your avatar!",
  permissions: ['member'],
  fn: function (msg) {
    msg.reply('This is your avatar: ' + msg.author.avatarURL)
  }
}

Commands.invite = {
  name: 'invite',
  help: 'Generates a link to invite Shadow to your server.',
  permissions: ['member'],
  fn: function (msg, suffix, lang, client) {
    client.generateInvite().then(invite => {
      msg.reply(invite)
    })
  }
}

Commands.lang = {
  name: 'lang',
  help: 'Changes Shadow language.',
  permissions: ['admin'],
  fn: function (msg, suffix, lang) {
    if (suffix.length > 0) {
      if (lang.getLocales().indexOf(suffix.trim()) > -1) {
        lang.setLocale(suffix.trim())
        msg.reply(lang.__('locale_changed_to'))
      }
    } else {
      msg.reply(lang.getLocales())
    }
  }
}

exports.Commands = Commands
exports.Category = 'Utils'
