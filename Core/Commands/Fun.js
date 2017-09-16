var Commands = []
var Request = require('request')

Commands.say = {
  name: 'say',
  help: 'Repeats with tts!',
  permissions: ['member'],
  fn: function (msg, suffix) {
    if (suffix.length <= 0) {
      msg.reply("I can't say nothing :3")
    } else {
      msg.channel.send(suffix, {tts: true})
    }
  }
}

Commands.randomcat = {
  name: 'randomcat',
  help: 'Sends a random picture or gif of cats.',
  permissions: ['member'],
  fn: function (msg, suffix, lang) {
    Request('http://random.cat/meow', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body)
        } catch (e) {
          msg.channel.send(lang.__('bad_answer_from_api'))
          return
        }
        var cat = JSON.parse(body)
        msg.channel.send(cat.file)
      } else {
        msg.channel.send(lang.__('something_went_wrong'))
      }
    })
  }
}

Commands.randomdog = {
  name: 'randomdog',
  help: 'Sends a random picture or gif of doggies.',
  permissions: ['member'],
  fn: function (msg, suffix, lang) {
    const baseUrl = 'https://dog.ceo/api/'

    if (suffix) {
      if (suffix === 'list') {
        Request(baseUrl + 'breeds/list', function (error, response, body) {
          if (!error && response.statusCode === 200) {
            try {
              JSON.parse(body)
            } catch (e) {
              msg.channel.send(lang.__('bad_answer_from_api'))
              return
            }
            var dog = JSON.parse(body)
            msg.channel.send(dog.message.join('\n'))
          } else {
            msg.channel.send(lang.__('something_went_wrong'))
          }
        })
      } else {
        Request(baseUrl + 'breed/' + suffix + '/images/random', function (error, response, body) {
          if (!error && response.statusCode === 200) {
            try {
              JSON.parse(body)
            } catch (e) {
              msg.channel.send(lang.__('bad_answer_from_api'))
              return
            }
            var dog = JSON.parse(body)
            if (dog.status === 'error') {
              msg.channel.send(lang.__('dog_breed_not_found'))
            } else {
              msg.channel.send(dog.message)
            }
          } else {
            msg.channel.send(lang.__('something_went_wrong'))
          }
        })
      }
    } else {
      Request(baseUrl + 'breeds/image/random', function (error, response, body) {
        if (!error && response.statusCode === 200) {
          try {
            JSON.parse(body)
          } catch (e) {
            msg.channel.send(lang.__('bad_answer_from_api'))
            return
          }
          var dog = JSON.parse(body)
          msg.channel.send(dog.message)
        } else {
          msg.channel.send(lang.__('something_went_wrong'))
        }
      })
    }
  }
}

Commands.yesno = {
  name: 'yesno',
  help: 'Sends a random gif or picture with yes or no',
  permissions: ['member'],
  fn: function (msg, suffix, lang) {
    Request('https://yesno.wtf/api/', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body)
        } catch (e) {
          msg.channel.send(lang.__('bad_answer_from_api'))
          return
        }
        var yesno = JSON.parse(body)
        msg.channel.send(yesno.image)
      } else {
        msg.channel.send(lang.__('something_went_wrong'))
      }
    })
  }
}

Commands.yomomma = {
  name: 'yomomma',
  help: 'Sends a random joke about ur mum.',
  permissions: ['member'],
  fn: function (msg, suffix, lang) {
    Request('http://api.yomomma.info/', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body)
        } catch (e) {
          msg.channel.send(lang.__('bad_answer_from_api'))
          return
        }
        var yomomma = JSON.parse(body)
        msg.channel.send(yomomma.joke)
      } else {
        msg.channel.send(lang.__('something_went_wrong'))
      }
    })
  }
}

exports.Commands = Commands
exports.Category = 'Fun'
