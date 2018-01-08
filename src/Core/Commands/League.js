var Commands = []

var Promise = require('bluebird')
const LeagueJs = require('leaguejs')
const Config = require('../../config.json')
const LeagueApi = new LeagueJs(Config.apiKeys.league, {PLATFORM_ID: 'euw'})
const LeagueChampion = require('../Models/LeagueChampion')
const dataDragonVersion = '7.17.1'

Commands.leagueprofile = {
  name: 'leagueprofile',
  help: 'Get your profile info of league of legends.',
  permissions: ['member'],
  fn: function (msg, suffix, lang, client) {
    LeagueApi.Summoner
        .gettingByName(suffix)
        .then(summonerData => {
          LeagueApi.League
            .gettingPositionsForSummonerId(summonerData.id)
            .then(leagueData => {
              getTopChampionsOfPlayer(summonerData.id).then(topChampions => {
                msg.channel.send(
                  {
                    'embed': {
                      'color': 2645853,
                      'author': {
                        'name': 'League of Legends profile',
                        'icon_url': 'http://i.imgur.com/xNLs83T.png'
                      },
                      'thumbnail': {
                        'url': 'http://ddragon.leagueoflegends.com/cdn/' + dataDragonVersion + '/img/profileicon/' + summonerData.profileIconId + '.png'
                      },
                      'fields': [
                        {
                          'name': 'Level / Region',
                          'value': summonerData.summonerLevel + ' / EU West',
                          'inline': true
                        },
                        {
                          'name': 'SoloQ League',
                          'value': leagueData[1].tier + ' ' + leagueData[1].rank,
                          'inline': true
                        },
                        {
                          'name': 'Top Champions',
                          'value': topChampions[0].name + '\n' + topChampions[1].name + '\n' + topChampions[2].name,
                          'inline': true
                        },
                        {
                          'name': 'Ranked Stats',
                          'value': '213923854',
                          'inline': true
                        }
                      ]
                    }
                  }
                )
              })
            })
        })
        .catch(err => {
          msg.reply('There was an error while calling the API.')
          console.log(err)
        })
  }
}

function getTopChampionsOfPlayer (id) {
  return new Promise(function (resolve, reject) {
    LeagueApi.ChampionMastery
    .gettingBySummoner(id)
    .then(championMasteryData => {
      var topChampions = []
      for (var i = 0; i < championMasteryData.length - 1 && i < 3; i++) {
        topChampions.push(championMasteryData[i].championId)
      }

      LeagueChampion.find({'id': { $in: topChampions }}).then(results => {
        if (results.length === 0) {
          LeagueApi.StaticData.gettingChampions({dataById: true}).then(champs => {
            for (var champ in champs.data) {
              if (champs.data.hasOwnProperty(champ)) {
                console.log('Champ to add: ')
                console.log(champs.data[champ])
                if (topChampions.indexOf(champs.data[champ].id) > -1) {
                  topChampions[topChampions.indexOf(champs.data[champ].id)] = champs.data[champ]
                }
                var leagueChamp = new LeagueChampion({
                  id: champs.data[champ].id,
                  title: champs.data[champ].title,
                  key: champs.data[champ].key,
                  name: champs.data[champ].name
                })
                leagueChamp.save()
              }
            }
            resolve(topChampions)
          })
        } else {
          console.log('Found champs on db')
          results.forEach(champ => {
            if (topChampions.indexOf(champ.id) > -1) {
              topChampions[topChampions.indexOf(champ.id)] = champ
            }
          })
          console.log(topChampions)
          resolve(topChampions)
        }
      })
    })
  })
}

exports.Commands = Commands
exports.Category = 'League'
