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
  fn: function (msg, suffix) {
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
      } else {
        msg.channel.send('Ups algo ha ido mal, vuelve a intentarlo')
      }
    })
  }
}

Commands.randomdog = {
  name: 'randomdog',
  help: 'Sends a random picture or gif of doggies.',
  permissions: ['member'],
  fn: function (msg, suffix) {
    Request('http://thedogapi.co.uk/api/v1/dog?limit=1', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body)
        } catch (e) {
          msg.channel.send('Mala respuesta desde la api')
          return
        }
        var dog = JSON.parse(body)
        msg.channel.send(dog.data[0].url)
      } else {
        msg.channel.send('Ups algo ha ido mal, vuelve a intentarlo')
      }
    })
  }
}

Commands.yesno = {
  name: 'yesno',
  help: 'Sends a random gif or picture with yes or no',
  permissions: ['member'],
  fn: function (msg, suffix) {
    Request('https://yesno.wtf/api/', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body)
        } catch (e) {
          msg.channel.send('Mala respuesta desde la api')
          return
        }
        var yesno = JSON.parse(body)
        msg.channel.send(yesno.image)
      } else {
        msg.channel.send('Ups algo ha ido mal, vuelve a intentarlo')
      }
    })
  }
}

Commands.yomomma = {
  name: 'yomomma',
  help: 'Sends a random joke about ur mum.',
  permissions: ['member'],
  fn: function (msg, suffix) {
    Request('http://api.yomomma.info/', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        try {
          JSON.parse(body)
        } catch (e) {
          msg.channel.send('Mala respuesta desde la api')
          return
        }
        var yomomma = JSON.parse(body)
        msg.channel.send(yomomma.joke)
      } else {
        msg.channel.send('Ups algo ha ido mal, vuelve a intentarlo')
      }
    })
  }
}

exports.Commands = Commands
exports.Category = 'Fun'
