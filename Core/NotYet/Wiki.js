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