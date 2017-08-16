const Discord = require('discord.js');
const client = new Discord.Client({autoReconnect: true, max_message_cache: 0});
var Config = require('./config.json');

// Command objects
var fs = require('fs');
var ytdl = require('ytdl-core');
var Request = require('request')

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
var DEFAULT_VOLUME = 100;
var queue = [];
var now_playing_data = {};
var inform_np = true;
var paused = false;


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
	    Request('http://random.cat/meow', function (error, response, body) {
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
        Request('http://thedogapi.co.uk/api/v1/dog?limit=1', function (error, response, body) {
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
        Request('https://yesno.wtf/api/', function (error, response, body) {
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
        Request('http://api.yomomma.info/', function (error, response, body) {
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
        text_channel = msg.guild.channels.find(chn => chn.name === 'pruebas-sity' && chn.type === "text");
        if(text_channel === null) throw "Couldn't find text channel '#" + 'pruebas-sity' + "' in server '" + server_name + "'";
        if (msg.member.voiceChannel) {
          msg.member.voiceChannel.join()
            .then(connection => {
              msg.reply('I have successfully connected to the channel!');
              voice_connection = connection;
            })
            .catch(console.log);
        } else {
          msg.reply('You need to join a voice channel first!');
        }
    }

    if (msg.content.startsWith(prefix + 'search')) {
        console.log(msg.author.username + ' used \'search\'');
        var message = msg.content.slice(prefix.length + 'search'.length,msg.content.length);
        search_video(msg,message);
    }

    if (msg.content.startsWith(prefix + 'pause')) {
        console.log(msg.author.username + ' used \'pause\'');
        paused = true;
        voice_handler.pause();
    }

    if (msg.content.startsWith(prefix + 'resume')) {
        console.log(msg.author.username + ' used \'resume\'');
        paused = false;
        voice_handler.resume();
    }

    if (msg.content.startsWith(prefix + 'skip')) {
        console.log(msg.author.username + ' used \'skip\'');
        if(voice_handler !== null) {
          msg.reply("Skipping...");
          voice_handler.end();
        } else {
          msg.reply("There is nothing being played.");
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

function search_video(message, query) {
  
  Request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + Config.api_keys.youtube, (error, response, body) => {
    var json = JSON.parse(body);
    if("error" in json) {
      message.reply("An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason);
    } else if(json.items.length === 0) {
      message.reply("No videos found matching the search criteria.");
    } else {
      add_to_queue(json.items[0].id.videoId, message);
    }
  })
}

function add_to_queue(video, message, mute = false) {

  var video_id = get_video_id(video);

  ytdl.getInfo("https://www.youtube.com/watch?v=" + video_id, (error, info) => {
    if(error) {
      message.reply("The requested video (" + video_id + ") does not exist or cannot be played.");
      console.log("Error (" + video_id + "): " + error);
    } else {
      queue.push({title: info["title"], id: video_id, user: message.author.username});
      if (!mute) {
        message.reply('"' + info["title"] + '" has been added to the queue.');
      }
      if(!paused && !is_bot_playing() && queue.length === 1) {
        play_next_song();
      }
    }
  });
}

function get_video_id(string) {
  var regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
  var matches = string.match(regex);

  if(matches) {
    return matches[1];
  } else {
    return string;
  }
}

function play_next_song() {
  if(is_queue_empty()) {
    text_channel.sendMessage("The queue is empty!");
  }

  var video_id = queue[0]["id"];
  var title = queue[0]["title"];
  var user = queue[0]["user"];

  now_playing_data["title"] = title;
  now_playing_data["user"] = user;

  if(inform_np) {
    text_channel.send('Now playing: "' + title + '" (requested by ' + user + ')');
  }

  var audio_stream = ytdl("https://www.youtube.com/watch?v=" + video_id,{filter: 'audioonly'});
  voice_handler = voice_connection.playStream(audio_stream,{seek: 0, volume: (DEFAULT_VOLUME/100)});

  voice_handler.once("end", reason => {
    voice_handler = null;
    console.log("Alola");
    if(!paused && !is_queue_empty()) {
      play_next_song();
    }
  });

  queue.splice(0,1);
}

function is_bot_playing() {
  return voice_handler !== null;
}

function is_queue_empty() {
  return queue.length === 0;
}

client.login(Config.shadow.token)