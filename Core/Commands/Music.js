var ytdl = require('ytdl-core')
var Request = require('request')
var Config = require('../../config.json')
const Logger = require('../Logger.js').Logger

// Handlers
var channelToSendInfo = []
var voiceConnection = []
var musicStream = []

var actualVolume = []
var isPaused = []
var queue = []
var nowPlaying = []
var timeout = 1500
var timeoutObj

var Commands = []

Commands.join = {
  name: 'join',
  help: 'Makes Shadow to join a voice channel.',
  permissions: ['member'],
  fn: function (msg, suffix, lang) {
    if (!msg.guild) return
    channelToSendInfo[msg.guild.id] = msg.guild.channels.find(chn => chn.name === 'general' && chn.type === 'text')
    if (channelToSendInfo[msg.guild.id] === null) throw new Error("Couldn't find text channel '#" + 'general' + "' in server.")
    if (msg.member.voiceChannel !== undefined) {
      msg.member.voiceChannel.join()
        .then(connection => {
          msg.reply(lang.__('join_voice_channel_success'))
          voiceConnection[msg.guild.id] = connection
          queue[msg.guild.id] = []
          actualVolume[msg.guild.id] = 100
          isPaused[msg.guild.id] = false
          nowPlaying[msg.guild.id] = null
        })
        .catch(console.log)
    } else {
      msg.reply(lang.__('not_in_a_voice_channel'))
    }
  }
}

Commands.leave = {
  name: 'leave',
  help: 'Makes Shadow to leave actual voice channel.',
  permissions: ['member'],
  fn: function (msg, suffix, lang) {
    leaveVoiceChannel(msg, lang)
  }
}

Commands.request = {
  name: 'request',
  help: 'Searchs a song on youtube and adds it to the queue.',
  permissions: ['member'],
  fn: function (msg, suffix, lang) {
    if (voiceConnection[msg.guild.id] !== null) {
      searchVideo(msg, suffix, lang)
    } else {
      msg.reply(lang.__('not_in_a_voice_channel'))
    }
  }
}

Commands.volume = {
  name: 'volume',
  help: 'Sets volume or returns actual one if no suffix specified.',
  permissions: ['member'],
  fn: function (msg, suffix, lang, bot) {
    var newVolume = parseInt(suffix)
    if (Number.isInteger(newVolume)) {
      if (newVolume >= 0 && newVolume <= 100) {
        actualVolume[msg.guild.id] = newVolume
        if (isBotPlaying(msg.guild.id)) {
          musicStream[msg.guild.id].setVolume(actualVolume[msg.guild.id] / 100)
        }
      } else {
        msg.reply(lang.__('volume_parameter_info'))
      }
    }
    msg.channel.send(
      {
        'embed': {
          'color': 2645853,
          'author': {
            'name': 'Shadow player',
            'icon_url': 'http://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/512/Music-icon.png'
          },
          'fields': [
            {
              'name': 'Info',
              'value': lang.__('Volume: %i %', actualVolume[msg.guild.id])
            }
          ]
        }
      }
    )
  }
}

Commands.pause = {
  name: 'pause',
  help: 'Pauses the actual song.',
  permissions: ['member'],
  fn: function (msg, suffix) {
    if (musicStream[msg.guild.id] !== undefined) {
      if (!isPaused[msg.guild.id]) {
        msg.reply('Pausing player.')
        isPaused[msg.guild.id] = true
        musicStream[msg.guild.id].pause()
      } else {
        msg.reply('The player is already paused.')
      }
    } else {
      msg.reply('The player is not playing anything.')
    }
  }
}

Commands.resume = {
  name: 'resume',
  help: 'Resumes the actual song.',
  permissions: ['member'],
  fn: function (msg, suffix) {
    if (isPaused[msg.guild.id]) {
      msg.reply('Resuming player.')
      isPaused[msg.guild.id] = false
      musicStream[msg.guild.id].resume()
    } else {
      msg.reply('The player is not paused.')
    }
  }
}

Commands.skip = {
  name: 'skip',
  help: 'Skips the actual song.',
  permissions: ['member'],
  fn: function (msg, suffix) {
    if (voiceConnection[msg.guild.id]) {
      if (isBotPlaying(msg.guild.id)) {
        msg.reply('Skipping...')
        musicStream[msg.guild.id].end('skip')
      } else {
        msg.reply('There is nothing being played.')
      }
    } else {
      msg.reply("I'm not in a voice channel.")
    }
  }
}

Commands.queue = {
  name: 'queue',
  help: 'Shows the actual queue.',
  permissions: ['member'],
  fn: function (msg, suffix) {
    if (queue[msg.guild.id] !== undefined) {
      if (!isQueueEmpty(msg.guild.id)) {
        var queueItems = []
        for (var i = 0; i < queue[msg.guild.id].length; i++) {
          queueItems.push('"' + queue[msg.guild.id][i].title + '" requested by ' + queue[msg.guild.id][i].user)
        }

        msg.channel.send(
          {
            'embed': {
              'color': 2645853,
              'author': {
                'name': 'Shadow player',
                'icon_url': 'http://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/512/Music-icon.png'
              },
              'fields': [
                {
                  'name': 'Now Playing',
                  'value': '"' + nowPlaying[msg.guild.id].title + '" requested by ' + nowPlaying[msg.guild.id].user
                },
                {
                  'name': 'Queue',
                  'value': queueItems.join(' \n ')
                }
              ]
            }
          }
        )
      } else {
        msg.channel.send(
          {
            'embed': {
              'color': 2645853,
              'author': {
                'name': 'Shadow player',
                'icon_url': 'http://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/512/Music-icon.png'
              },
              'fields': [
                {
                  'name': 'Info',
                  'value': 'The queue is empty.'
                }
              ]
            }
          }
        )
      }
    } else {
      msg.reply("I'm not connected to a voice channel.")
    }
  }
}

function searchVideo (msg, query, lang) {
  Request('https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=' + encodeURIComponent(query) + '&key=' + Config.apiKeys.youtube, (err, response, body) => {
    if (err) {
      console.log(err)
    }
    var json = JSON.parse(body)
    if ('error' in json) {
      msg.reply('An error has occurred: ' + json.error.errors[0].msg + ' - ' + json.error.errors[0].reason)
    } else if (json.items.length === 0) {
      msg.reply('No videos found matching the search criteria.')
    } else {
      addToQueue(json.items[0].id.videoId, msg, lang)
    }
  })
}

function addToQueue (video, msg, lang) {
  var videoId = getVideoId(video)

  ytdl.getInfo('https://www.youtube.com/watch?v=' + videoId, (error, info) => {
    var msgInfo = ''
    if (error) {
      msgInfo = 'The requested video (' + videoId + ') does not exist or cannot be played.'
    } else {
      queue[msg.guild.id].push({title: info['title'], id: videoId, user: msg.author.username})
      msgInfo = '"' + info['title'] + '" has been added to the queue.'
      Logger.debug('isPaused: ' + isPaused[msg.guild.id] + ' isBotPlaying: ' + isBotPlaying(msg.guild.id) + ' queueLength: ' + queue[msg.guild.id].length)
      if (!isPaused[msg.guild.id] && !isBotPlaying(msg.guild.id) && queue[msg.guild.id].length === 1) {
        Logger.debug("Let's play this song")
        if (timeoutObj !== undefined) {
          Logger.debug('There was a timeout set, clearing it.')
          clearTimeout(timeoutObj)
          timeoutObj = undefined
        }
        playNextSong(msg, lang)
      }
    }
    msg.channel.send(
      {
        'embed': {
          'color': 2645853,
          'author': {
            'name': 'Shadow player',
            'icon_url': 'http://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/512/Music-icon.png'
          },
          'fields': [
            {
              'name': 'Info',
              'value': msgInfo
            }
          ]
        }
      }
    )
  })
}

function getVideoId (string) {
  var regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/
  var matches = string.match(regex)

  if (matches) {
    return matches[1]
  } else {
    return string
  }
}

function playNextSong (msg, lang) {
  var videoId = queue[msg.guild.id][0]['id']
  var title = queue[msg.guild.id][0]['title']
  var user = queue[msg.guild.id][0]['user']

  nowPlaying[msg.guild.id] = {}
  nowPlaying[msg.guild.id].title = title
  nowPlaying[msg.guild.id].user = user
  nowPlaying[msg.guild.id].id = videoId

  Logger.info('NowPlaying: ' + nowPlaying[msg.guild.id].title)

  channelToSendInfo[msg.guild.id].send(
    {
      'embed': {
        'color': 2645853,
        'author': {
          'name': 'Shadow player',
          'icon_url': 'http://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/512/Music-icon.png'
        },
        'fields': [
          {
            'name': 'Now Playing',
            'value': '"' + title + '" requested by ' + user
          }
        ]
      }
    }
  )
<<<<<<< HEAD
  musicStream[msg.guild.id] = voiceConnection[msg.guild.id].playStream(
    ytdl('https://www.youtube.com/watch?v=' + nowPlaying[msg.guild.id].id, {filter: 'audioonly'}),
    {
      volume: (actualVolume[msg.guild.id] / 100)
    }
  )
=======
  playSong(msg.guild.id)
>>>>>>> 1add4ef46ef28fbe96304452bd6d773b10052665

  musicStream[msg.guild.id].once('end', reason => {
    Logger.debug(nowPlaying[msg.guild.id].title + ' ended because ' + reason)
    if (reason === undefined) {
      Logger.debug('This song ended prematurely, replaying.')
<<<<<<< HEAD
      musicStream[msg.guild.id] = voiceConnection[msg.guild.id].playStream(
        ytdl('https://www.youtube.com/watch?v=' + nowPlaying[msg.guild.id].id, {filter: 'audioonly'}),
        {
          volume: (actualVolume[msg.guild.id] / 100)
        }
      )
    } else {
      nowPlaying[msg.guild.id] = null
      if (!isPaused[msg.guild.id] && !isQueueEmpty(msg.guild.id)) {
        playNextSong(msg, lang)
      } else if (isQueueEmpty(msg.guild.id)) {
        timeoutObj = setTimeout(leaveVoiceChannel, timeout, msg, lang)
=======
      playSong(msg.guild.id)
    } else {
      nowPlaying[msg.guild.id] = null
      if (!isPaused[msg.guild.id] && !isQueueEmpty(msg.guild.id)) {
        playNextSong(msg)
      } else if (isQueueEmpty(msg.guild.id)) {
>>>>>>> 1add4ef46ef28fbe96304452bd6d773b10052665
        channelToSendInfo[msg.guild.id].send(
          {
            'embed': {
              'color': 2645853,
              'author': {
                'name': 'Shadow player',
                'icon_url': 'http://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/512/Music-icon.png'
              },
              'fields': [
                {
                  'name': 'Info',
                  'value': 'No more songs in the queue'
                }
              ]
            }
          }
        )
      }
    }
  })

  queue[msg.guild.id].splice(0, 1)
  Logger.debug('queueLength: ' + queue[msg.guild.id].length)
}

<<<<<<< HEAD
function leaveVoiceChannel (msg, lang) {
  if (voiceConnection[msg.guild.id] !== undefined) {
    msg.reply(lang.__('leave_voice_channel'))
    voiceConnection[msg.guild.id].channel.leave()
    queue[msg.guild.id] = undefined
  } else {
    msg.reply(lang.__('not_in_a_voice_channel'))
  }
=======
function playSong (guildId) {
  return new Promise((resolve, reject) => {
    musicStream[guildId] = voiceConnection[guildId].playStream(
      ytdl('https://www.youtube.com/watch?v=' + nowPlaying[guildId].id, {filter: 'audioonly'}),
      {
        volume: (actualVolume[guildId] / 100)
      }
    )
    resolve()
  })
>>>>>>> 1add4ef46ef28fbe96304452bd6d773b10052665
}

function isBotPlaying (guildId) {
  return nowPlaying[guildId] !== null
}

function isQueueEmpty (guildId) {
  return queue[guildId].length === 0
}

exports.Commands = Commands
exports.Category = 'Music'
