var ytdl = require('ytdl-core');
var Request = require('request');
var Config = require('../../config.json');
var voice_connection = null;
var voice_handler = null;
var DEFAULT_VOLUME = 100;
var queue = [];
var now_playing_data = {};
var inform_np = true;
var paused = false;
var Commands = [];

Commands.join = {
  name: 'join',
  help: "Makes Shadow to join a voice channel.",
  fn: function (msg, suffix) {
    if (!msg.guild) return;
    text_channel = msg.guild.channels.find(chn => chn.name === 'general' && chn.type === "text");
    if(text_channel === null) throw "Couldn't find text channel '#" + 'general' + "' in server '" + server_name + "'";
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
}

Commands.leave = {
  name: 'leave',
  help: "Makes Shadow to .leave actual voice channel.",
  fn: function (msg, suffix) {
    if(voice_connection !== null) {
      msg.reply("Leaving channel.");
      voice_connection.channel.leave();
    } else {
      msg.reply("I'm not in a voice channel.");
    }
  }
}

Commands.search = {
  name: 'search',
  help: "Searchs a song on youtube and adds it to the queue.",
  fn: function (msg, suffix) {
    search_video(msg, suffix);
  }
}

Commands.volume = {
  name: 'volume',
  help: "Sets volume or returns actual one if no suffix specified.",
  fn: function (msg, suffix, bot) {
    new_volume = parseInt(suffix);
    if(Number.isInteger(new_volume)){
      DEFAULT_VOLUME = new_volume;
      if(voice_handler !== null){
        voice_handler.setVolume(DEFAULT_VOLUME/100);
      }
    }
    msg.reply("Volume: " + DEFAULT_VOLUME + "%");
  }
}

Commands.pause = {
  name: 'pause',
  help: "Pauses the actual song.",
  fn: function (msg, suffix) {
    paused = true;
    voice_handler.pause();
  }
}

Commands.resume = {
  name: 'resume',
  help: "Resumes the actual song.",
  fn: function (msg, suffix) {
    paused = true;
    voice_handler.pause();
  }
}

Commands.skip = {
  name: 'skip',
  help: "Skips the actual song.",
  fn: function (msg, suffix) {
    if(voice_handler !== null) {
      msg.reply("Skipping...");
      voice_handler.end();
    } else {
      msg.reply("There is nothing being played.");
    }
  }
}

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


exports.Commands = Commands