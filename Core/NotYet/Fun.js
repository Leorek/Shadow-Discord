// Command objects
var fs = require('fs');
var Request = require('request')

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