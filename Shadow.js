const Discord = require('discord.js');
const client = new Discord.Client();
var Config = require('./config.json');

// Command objects
var Cb = require('cleverbot-node');
var cleverbot = new Cb()
Cb.prepare(function () {
  console.log('Cleverbot iniciado')
});
var fs = require('fs');

// Ark-list command / TODO Move to own file
var arkTasksList = [];

client.on('ready', () => {
	arkListLoad();
});

client.on('message', msg => {

	let prefix = "!"
	if(!msg.content.startsWith(prefix)) return
	if(msg.author.bot) return

  	if (msg.content.startsWith(prefix + 'ping')) {
  		console.log(msg.author.username + ' used \'ping\'');
   		msg.reply('pong');
  	}
  	
  	if(msg.content.startsWith(prefix + 'randomcat')){
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
	      	msg.channel.sendMessage('Ups algo ha ido mal, vuelve a intentarlo');
	      }
	    })
    }
    
    if(msg.content.startsWith(prefix + 'cleverbot')){
  		console.log(msg.author.username + ' used \'cleverbot\'');
  		let suffix = msg.content.split(" ").slice(1);
  		if((suffix !== undefined) && (suffix.length > 0)){		
			msg.channel.startTyping()
		    cleverbot.write(suffix, function (r) {
		      msg.channel.sendMessage(r.message);
		      msg.channel.stopTyping()
		    })
		}
    }
    
    if(msg.content.startsWith(prefix + 'arklist')){
    	console.log(msg.author.username + ' used \'arklist\'');
    	let suffix = msg.content.split(" ");
    	let info = "";
    	if(suffix.length > 1)
    	{
    		switch(suffix[1])
    		{
    			case "add":
    				info = arkListAdd(msg.content.split("add").slice(1));
    				break;
    			case "remove":
    				info = arkListRemove(suffix[2]);
    				break;
    			case "show":
    				info = arkListShow();
    				break;
    			case "assign":
    				info = arkListAssign(suffix[2],suffix[3]);
    				break;
    			case "save":
    				info = arkListSave();
    				break;
    			case "help":
    				info = "Use: !arklist add task || !arklist remove taskId || !arklist show || !arklist assign task player."
    				break;
    		}
    	}
    	else
    	{
    		info = "Incorrect format. Use: !arklist add task || !arklist show || !arklist assign task player.";
    	}

    	msg.channel.sendMessage(info);
    }
});

function arkListAdd(task){
	let result = "";
	var playerTask ={};

	playerTask["task"] = task;
	playerTask["player"] = "Unasigned";
	arkTasksList.push(playerTask);

	result = "Added";

	return result;
}

function arkListRemove(task){
	let result = "";
	task = parseInt(task);
	if(task >= 0 && task < arkTasksList.length ){
		console.log("Remove " + task);
		arkTasksList.splice(task, 1);
		result = "Removed";
	}else{
		result = "Task id not valid";
	}

	return result;
}

function arkListShow(){
	let result = "";

	if(arkTasksList.length == 0)
	{
		result = "The list is empty";
	}else
	{
		var msgArray  = [];
		msgArray.push('```ini');

		for(i=0; i < arkTasksList.length; i++)
		{
			msgArray.push(i + ")" + arkTasksList[i]["task"] + " - " + arkTasksList[i]["player"] + "\n");
		}

		msgArray.push('```');
		result += msgArray.join('\n');
	}

	return result;
}

function arkListAssign(player, task){
	let result = "";

	arkTasksList[task]["player"] = player;
	result = "Assigned";

	return result;
}

function arkListSave(){
	let result = "Changes saved";
	let jsonData = JSON.stringify(arkTasksList);

	fs.writeFile("arkTasksList.json", jsonData, function(err) {
	    if(err) {
	    	result = "There was an error";
	        return console.log(err);
	    }
	});

	return result;
}

function arkListLoad(){
	console.log('Loading arkTasksList');

  	fs.readFile('arkTasksList.json', 'utf8', function(err, data) {  
    	if (err != null && err.code === "ENOENT"){
    		console.log('There was a problem loading file arkTasksList.json');
    	} else{
    		arkTasksList = JSON.parse(data);
    	}
  	});

  	console.log('Done');	
}

client.login(Config.shadow.token)