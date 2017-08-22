const Discord = require('discord.js');
const Client = new Discord.Client({autoReconnect: true, max_message_cache: 0});
var Bunyan = require('bunyan');
var Logger = Bunyan.createLogger(
  {
    name: 'Shadow',
    streams: [
      {
        level: 'info',
        path: './shadow.log'
      },
      {
        level: 'error',
        path: './shadow.log'
      }
    ]
  });
var Config = require('./config.json');
var CommandCenter = require('./Core/CommandCenter.js');

let prefix = "!";

Client.on('ready', () => {
  Client.user.setGame('leorek.gitlab.io');
})

Client.on('message', msg => {

	
	if(!msg.content.startsWith(prefix)) return
	if(msg.author.bot) return

  var command = getCommand(msg.content);
  var suffix = getSuffix(msg.content);

  if (CommandCenter.Commands[command]) {
      if (typeof CommandCenter.Commands[command] !== 'object') {
        return // ignore JS build-in array functions
      }

      Logger.info('Executing %s from %s', command, msg.author.username);

        try {
          CommandCenter.Commands[command].fn(msg,suffix);
        } catch (e) {
          msg.channel.send('An error ocurred processing this command.');
          Logger.error(e);
        }
      }else if(command === 'help'){
        Logger.info('Executing %s from %s', command, msg.author.username);
        CommandCenter.helpHandle(msg,suffix);
    }
});

function getCommand(message){
  return message.substr(prefix.length).split(' ')[0].toLowerCase();
}

function getSuffix(message){
  suffix = message.substr(prefix.length).split(' ')
  suffix = suffix.slice(1, suffix.length).join(' ')
  return suffix;
}

Client.login(Config.shadow.token)