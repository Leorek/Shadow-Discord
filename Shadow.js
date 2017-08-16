const Discord = require('discord.js');
const client = new Discord.Client();
var Config = require('./config.json');

// Command objects
var fs = require('fs');
var yt = require('ytdl-core');

// Media wiki
var wtf_wikipedia = require("wtf_wikipedia")
var mwbot = require('nodemw');
var mwclient = new mwbot({
    protocol: 'https',           // Wikipedia now enforces HTTPS
    server: 'es.wikipedia.org',  // host name of MediaWiki-powered site
    path: '/w',                  // path to api.php script
    debug: false                 // is more verbose when set to true
});
var iclient = new mwbot({
    protocol: 'http',           // Wikipedia now enforces HTTPS
    server: 'inciclopedia.wikia.com',  // host name of MediaWiki-powered site
    path: '/w',                  // path to api.php script
    debug: false                 // is more verbose when set to true
});

client.on('ready', () => {
  client.user.setGame('leorek.gitlab.io');
})

// Music variables

var voice_connection = null;
var voice_handler = null;


client.on('message', msg => {

	let prefix = "!"
	if(!msg.content.startsWith(prefix)) return
	if(msg.author.bot) return

  	if (msg.content.startsWith(prefix + 'ping')) {
  		console.log(msg.author.username + ' used \'ping\'');
   		msg.reply('pong');
  	}

    if(msg.content.startsWith(prefix + 'say')){
        console.log(msg.author.username + ' used \'say\'');
        var message = msg.content.slice(prefix.length + 'say'.length,msg.content.length);
        if(message.length <= 0){
            msg.reply("I can't say nothing :3");
        }else{
            msg.channel.send(message, {tts:true});
        }   
    }
  	
  	if(msg.content.startsWith(prefix + 'randomcat')){
  		console.log(msg.author.username + ' used \'randomcat\'')
	  	var request = require('request')
	    request('http://random.cat/meow', function (error, response, body) {
	      if (!error && response.statusCode === 200) {
	        try {
	          JSON.parse(body)
	        } catch (e) {
	        	msg.channel.send('Mala respuesta desde la api')
	          return
	        }
	        var cat = JSON.parse(body)
	        msg.channel.send(cat.file)
	      }else{
	      	msg.channel.send('Ups algo ha ido mal, vuelve a intentarlo');
	      }
	    })
    }

    if(msg.content.startsWith(prefix + 'randomdog')){
        console.log(msg.author.username + ' used \'randomdog\'')
        var request = require('request')
        request('http://thedogapi.co.uk/api/v1/dog?limit=1', function (error, response, body) {
          if (!error && response.statusCode === 200) {
            try {
              JSON.parse(body);
            } catch (e) {
                msg.channel.send('Mala respuesta desde la api')
              return
            }
            var dog = JSON.parse(body);
            msg.channel.send(dog.data[0].url);
          }else{
            msg.channel.send('Ups algo ha ido mal, vuelve a intentarlo');
          }
        })
    }

    if(msg.content.startsWith(prefix + 'yesno')){
        console.log(msg.author.username + ' used \'yesno\'')
        var request = require('request')
        request('https://yesno.wtf/api/', function (error, response, body) {
          if (!error && response.statusCode === 200) {
            try {
              JSON.parse(body);
            } catch (e) {
                msg.channel.send('Mala respuesta desde la api')
              return
            }
            var yesno = JSON.parse(body);
            msg.channel.send(yesno.image);
          }else{
            msg.channel.send('Ups algo ha ido mal, vuelve a intentarlo');
          }
        })
    }

    if(msg.content.startsWith(prefix + 'yomomma')){
        console.log(msg.author.username + ' used \'yomomma\'')
        var request = require('request')
        request('http://api.yomomma.info/', function (error, response, body) {
          if (!error && response.statusCode === 200) {
            try {
              JSON.parse(body);
            } catch (e) {
                msg.channel.send('Mala respuesta desde la api');
              return
            }
            var yomomma = JSON.parse(body);
            msg.channel.send(yomomma.joke);
          }else{
            msg.channel.send('Ups algo ha ido mal, vuelve a intentarlo');
          }
        })
    }

    if(msg.content.startsWith(prefix + 'wiki')){
        console.log(msg.author.username + ' used \'wiki\'')

        var suffix = match[1];
        console.log("------------- STARTING QUERY -------------")
        mwclient.getArticle(suffix, undefined, function(err , info, next){
            if(err != null){
                console.log('There was an error --> ' + err);
            }else{
                wikinfo = wtf_wikipedia.parse(info);
                console.log(wikinfo);
                if(wikinfo.text !== undefined && wikinfo.text.get("Intro") !== undefined){
                    msg.channel.send(wikinfo.text.get("Intro")[0].text);
                }
            }
        })
        console.log("------------- FINISHING QUERY -------------");
    }

    // Voice things

    if (msg.content.startsWith(prefix + 'join')) {
        console.log(msg.author.username + ' used \'join\'');
        if (!msg.guild) return;

        if (msg.member.voiceChannel) {
          msg.member.voiceChannel.join()
            .then(connection => {
              msg.reply('I have successfully connected to the channel!');
              voice_connection = connection;
              voice_handler = voice_connection.playStream(yt("https://www.youtube.com/watch?v=I8y99z5EVtY",{filter: 'audioonly'}));
            })
            .catch(console.log);
        } else {
          msg.reply('You need to join a voice channel first!');
        }
    }

    if (msg.content.startsWith(prefix + 'leave')) {
        console.log(msg.author.username + ' used \'leave\'');
        if (!msg.guild) return;

        if (msg.member.voiceChannel) {
          msg.member.voiceChannel.leave();
        }
    }

});

client.login(Config.shadow.token)