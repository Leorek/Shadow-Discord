const Discord = require('discord.js')
const Client = new Discord.Client({autoReconnect: true, max_message_cache: 0})
const Lang = require('i18n')
Lang.configure({
  directory: './Locales'
})
var Logger = require('./Core/Logger.js').Logger
var Config = require('./config.json')
var CommandCenter = require('./Core/CommandCenter.js')
var UserCenter = require('./Core/UserCenter.js')
let prefix = Config.settings.prefix

Client.on('ready', () => {
  Logger.info('Shadow is up and ready.')
  var generalChannel = null
  Client.guilds.forEach(guild => {
    generalChannel = guild.channels.find(chn => chn.name === 'general' && chn.type === 'text')
    if (generalChannel !== null) {
      generalChannel.send('Shadow is up and ready')
    }
  })
})

Client.on('message', msg => {
  if (!msg.content.startsWith(prefix)) return
  if (msg.author.bot) return

  var command = getCommand(msg.content)
  var suffix = getSuffix(msg.content)

  if (CommandCenter.Commands[command]) {
    if (typeof CommandCenter.Commands[command] !== 'object') {
      return
    }

    Logger.info('Executing %s from %s', command, msg.author.username)

    try {
      UserCenter.userHasPermissions(msg.author, CommandCenter.Commands[command]).then(hasPermissions => {
        if (hasPermissions) {
          CommandCenter.Commands[command].fn(msg, suffix, Lang)
        } else {
          msg.reply("You don't have permissions to execute this command.")
        }
      })
    } catch (e) {
      msg.channel.send('An error ocurred processing this command.')
      Logger.error(e)
    }
  } else if (command === 'help') {
    Logger.info('Executing %s from %s', command, msg.author.username)
    CommandCenter.helpHandle(msg, suffix, Lang, Client.user)
  }
})

function getCommand (message) {
  return message.substr(prefix.length).split(' ')[0].toLowerCase()
}

function getSuffix (message) {
  var suffix = message.substr(prefix.length).split(' ')
  suffix = suffix.slice(1, suffix.length).join(' ')
  return suffix
}

Client.login(Config.shadow.token)
