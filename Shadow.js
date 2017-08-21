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
      }
    ]
  });
var Config = require('./config.json');
var commands = require('./Core/CommandCenter.js').Commands;

let prefix = "!";

Client.on('ready', () => {
  Client.user.setGame('leorek.gitlab.io');
})

Client.on('message', msg => {

	
	if(!msg.content.startsWith(prefix)) return
	if(msg.author.bot) return

  var command = getCommand(msg.content);
  var suffix = getSuffix(msg.content);

  if (commands[command]) {
      if (typeof commands[command] !== 'object') {
        return // ignore JS build-in array functions
      }

      Logger.info('Executing %s from %s', command, msg.author.username);
      
      try {
        commands[command].fn(msg,suffix);
      } catch (e) {
          msg.channel.send('An error ocurred processing this command.');
      }
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