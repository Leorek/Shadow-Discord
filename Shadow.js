const Discord = require('discord.js')
const client = new Discord.Client()
var Config = require('./config.json')

// Command objects
var Cb = require('cleverbot-node')
var cleverbot = new Cb()
Cb.prepare(function () {
  console.log('Cleverbot iniciado')
})

client.on('ready', () => {
  console.log('I am ready!');
})

client.on('message', msg => {

	let prefix = "!"
	if(!msg.content.startsWith(prefix)) return
	if(msg.author.bot) return

  	if (msg.content.startsWith(prefix + 'ping')) {
  		console.log()
   		msg.reply('pong')
  	}
  	else if(msg.content.startsWith(prefix + 'randomcat')){
  		console.log(msg.author.username + ' used \'randomcat\'')
	  	var request = require('request')
	    request('http://random.cat/meow', function (error, response, body) {
	      if (!error && response.statusCode === 200) {
	        try {
	          JSON.parse(body)
	        } catch (e) {
	        	msg.channel.sendMessage('Mala respuesta desde la api')
	          return
	        }
	        var cat = JSON.parse(body)
	        msg.channel.sendFile(cat.file)
	      }else{
	      	msg.channel.sendMessage('Ups algo ha ido mal, vuelve a intentarlo')
	      }
	    })
    }
    else if(msg.content.startsWith(prefix + 'cleverbot')){
  		console.log(msg.author.username + ' used \'cleverbot\'')
  		let suffix = msg.content.split(" ").slice(1);
  		if((suffix !== undefined) && (suffix.length > 0)){		
			msg.channel.startTyping()
		    cleverbot.write(suffix, function (r) {
		      msg.channel.sendMessage(r.message)
		      msg.channel.stopTyping()
		    })
		}
    }
})

client.login(Config.shadow.token)