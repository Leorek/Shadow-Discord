// Media wiki
var Commands = []
var wtfWikipedia = require('wtf_wikipedia')
var Mwbot = require('nodemw')
var mwclient = new Mwbot({
  protocol: 'https',           // Wikipedia now enforces HTTPS
  server: 'es.wikipedia.org',  // host name of MediaWiki-powered site
  path: '/w',                  // path to api.php script
  debug: false                 // is more verbose when set to true
})
/*
var iclient = new mwbot({
  protocol: 'http',           // Wikipedia now enforces HTTPS
  server: 'inciclopedia.wikia.com',  // host name of MediaWiki-powered site
  path: '/w',                  // path to api.php script
  debug: false                 // is more verbose when set to true
})
*/

Commands.wiki = {
  name: 'wiki',
  help: 'Searchs on wikipedia!.',
  permissions: ['member'],
  fn: function (msg, suffix) {
    console.log('------------- STARTING QUERY -------------')
    mwclient.getArticle(suffix, undefined, function (err, info, next) {
      if (err != null) {
        console.log('There was an error --> ' + err)
      } else {
        var wikinfo = wtfWikipedia.parse(info)
        console.log(wikinfo)
        if (wikinfo.text !== undefined && wikinfo.text.get('Intro') !== undefined) {
          msg.channel.send(wikinfo.text.get('Intro')[0].text)
        }
      }
    })
    console.log('------------- FINISHING QUERY -------------')
  }
}

exports.Commands = Commands
exports.Category = 'Wiki'
