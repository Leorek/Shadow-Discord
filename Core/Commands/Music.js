const YoutubeDL = require('youtube-dl')
const ytdl = require('ytdl-core')
const Config = require('../../config.json')
const Logger = require('../Logger.js').Logger
var client = null

let MAX_QUEUE_SIZE = (Config.music && Config.music.maxQueueSize) || 20
let DEFAULT_VOLUME = (Config.music && Config.music.volume) || 50

let queues = {}

var Commands = []

Commands.play = {
  name: 'play',
  help: 'Searchs a song on youtube and adds it to the queue.',
  permissions: ['member'],
  fn: function (msg, suffix, lang, Client) {
    client = Client
    play(msg, suffix, lang)
  }
}

Commands.leave = {
  name: 'leave',
  help: 'Makes Shadow to leave actual voice channel.',
  permissions: ['member'],
  fn: function (msg, suffix, lang) {
    leave(msg, lang)
  }
}

Commands.volume = {
  name: 'volume',
  help: 'Sets volume or returns actual one if no suffix specified.',
  permissions: ['member'],
  fn: function (msg, suffix, lang, bot) {
    volume(msg, suffix)
  }
}

Commands.pause = {
  name: 'pause',
  help: 'Pauses the actual song.',
  permissions: ['member'],
  fn: function (msg, suffix, lang) {
    pause(msg, suffix)
  }
}

Commands.resume = {
  name: 'resume',
  help: 'Resumes the actual song.',
  permissions: ['member'],
  fn: function (msg, suffix) {
    resume(msg, suffix)
  }
}

Commands.skip = {
  name: 'skip',
  help: 'Skips the actual song.',
  permissions: ['member'],
  fn: function (msg, suffix, lang) {
    skip(msg, suffix, lang)
  }
}

Commands.queue = {
  name: 'queue',
  help: 'Shows the actual queue.',
  permissions: ['member'],
  fn: function (msg, suffix) {
    queue(msg, suffix)
  }
}

Commands.clearqueue = {
  name: 'clearqueue',
  help: 'Clears the actual queue.',
  permissions: ['member'],
  fn: function (msg, suffix) {
    clearqueue(msg, suffix)
  }
}

function play (msg, suffix, lang) {
  if (msg.member.voiceChannel === undefined) return msg.channel.send(format(lang.__('music_not_in_voice_channel')))

  if (!suffix) return msg.channel.send(format(lang.__('music_nothing_specified')))

  const queue = getQueue(msg.guild.id)

  if (queue.length >= MAX_QUEUE_SIZE) {
    return msg.channel.send(format(lang.__('music_max_queue_size_reached')))
  }

  msg.channel.send(format(lang.__('music_searching'))).then(response => {
    var searchstring = suffix
    if (!suffix.toLowerCase().startsWith('http')) {
      searchstring = 'gvsearch1:' + suffix
    }

    YoutubeDL.getInfo(searchstring, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
      if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
        return response.edit(format(lang.__('music_invalid_video')))
      }

      info.requester = msg.author.id

      response.edit(format(lang.__('music_queued') + info.title)).then(() => {
        queue.push(info)
        if (queue.length === 1) executeQueue(msg, queue)
      }).catch(Logger.error)
    })
  }).catch(Logger.error)
}

function leave (msg, suffix, lang) {
  const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
  if (voiceConnection === null) return msg.channel.send(format(lang.__('music_not_in_channel')))

  const queue = getQueue(msg.guild.id)
  queue.splice(0, queue.length)

  voiceConnection.player.dispatcher.end()
  voiceConnection.disconnect()
}

function skip (msg, suffix, lang) {
  const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
  if (voiceConnection === null) return msg.channel.send(format(lang.__('music_not_playing')))

  const queue = getQueue(msg.guild.id)

  let toSkip = 1
  if (!isNaN(suffix) && parseInt(suffix) > 0) {
    toSkip = parseInt(suffix)
  }
  toSkip = Math.min(toSkip, queue.length)

  queue.splice(0, toSkip - 1)

  const dispatcher = voiceConnection.player.dispatcher
  if (voiceConnection.paused) dispatcher.resume()
  dispatcher.end()

  msg.channel.send(format(lang.__('music_skipped_songs')))
}

function pause (msg, suffix, lang) {
  const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
  if (voiceConnection === null) return msg.channel.send(format(lang.__('music_not_playing')))

  msg.channel.send(format('Playback paused.'))
  const dispatcher = voiceConnection.player.dispatcher
  if (!dispatcher.paused) dispatcher.pause()
}

function resume (msg, suffix, lang) {
  const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
  if (voiceConnection === null) return msg.channel.send(format(lang.__('music_not_playing')))

  msg.channel.send(format('Playback resumed.'))
  const dispatcher = voiceConnection.player.dispatcher
  if (dispatcher.paused) dispatcher.resume()
}

function volume (msg, suffix, lang) {
  const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
  if (voiceConnection === null) return msg.channel.send(format(lang.__('music_not_playing')))

  const dispatcher = voiceConnection.player.dispatcher

  if (suffix > 200 || suffix < 0) {
    return msg.channel.send(format(lang.__('music_volume_not_valid'))).then((response) => {
      response.delete(5000)
    })
  }

  msg.channel.send(format('Volume set to ' + suffix))
  dispatcher.setVolume((suffix / 100))
}

function queue (msg, suffix, lang) {
  const queue = getQueue(msg.guild.id)

  const list = queue.map((video, index) => ((index + 1) + ': ' + video.title)).join('\n')

  msg.channel.send({
    'embed': {
      'color': 2645853,
      'author': {
        'name': 'Shadow player',
        'icon_url': 'http://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/512/Music-icon.png'
      },
      'fields': [
        {
          'name': lang.__('music_now_playing'),
          'value': 'TODO'
        },
        {
          'name': 'Queue',
          'value': list
        }
      ]
    }
  })
}

function clearqueue (msg, suffix, lang) {
  const queue = getQueue(msg.guild.id)

  queue.splice(0, queue.length)
  msg.channel.send(format(lang.__('music_queue_cleared')))
}

function executeQueue (msg, queue) {
  if (queue.length === 0) {
    msg.channel.send(format('Playback finished.'))

    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection !== null) return voiceConnection.disconnect()
  }

  new Promise((resolve, reject) => {
    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id === msg.guild.id)
    if (voiceConnection === null) {
      if (msg.member.voiceChannel) {
        msg.member.voiceChannel.join().then(connection => {
          resolve(connection)
        }).catch((error) => {
          Logger.error(error)
        })
      } else {
        queue.splice(0, queue.length)
        reject(new Error('User not in a voice channel'))
      }
    } else {
      resolve(voiceConnection)
    }
  }).then(connection => {
    const video = queue[0]

    Logger.debug(video.webpage_url)

    msg.channel.send(format('Now Playing: ' + video.title)).then(() => {
      let dispatcher = connection.playStream(ytdl(video.webpage_url, {filter: 'audioonly'}), {seek: 0, volume: (DEFAULT_VOLUME / 100)})

      connection.on('error', (error) => {
        Logger.error(error)
        queue.shift()
        executeQueue(msg, queue)
      })

      dispatcher.on('error', (error) => {
        Logger.debug(error)
        queue.shift()
        executeQueue(msg, queue)
      })

      dispatcher.on('end', () => {
        setTimeout(() => {
          if (queue.length > 0) {
            queue.shift()
            executeQueue(msg, queue)
          }
        }, 1000)
      })
    }).catch((error) => {
      Logger.error(error)
    })
  }).catch((error) => {
    Logger.error(error)
  })
}

function getQueue (server) {
  if (!queues[server]) queues[server] = []
  return queues[server]
}

function format (info) {
  return {
    'embed': {
      'color': 2645853,
      'author': {
        'name': 'Shadow player',
        'icon_url': 'http://icons.iconarchive.com/icons/dtafalonso/yosemite-flat/512/Music-icon.png'
      },
      'fields': [
        {
          'name': 'Info',
          'value': info
        }
      ]
    }
  }
}

exports.Commands = Commands
exports.Category = 'Music'
