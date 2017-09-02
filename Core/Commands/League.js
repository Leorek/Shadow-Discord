var Commands = []

const LeagueJs = require('leaguejs')
const Config = require('../../config.json')
const LeagueApi = new LeagueJs(Config.apiKeys.league, {PLATFORM_ID: 'euw'})
const dataDragonVersion = '7.17.1'

Commands.leagueprofile = {
  name: 'leagueprofile',
  help: 'Get your profile info of league of legends.',
  permissions: ['member'],
  fn: function (msg, suffix) {
    LeagueApi.Summoner
        .gettingByName(suffix)
        .then(summonerData => {
          LeagueApi.League
            .gettingPositionsForSummonerId(summonerData.id)
            .then(leagueData => {
               // getTopChampionsOfPlayer(summonerData.id);
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
                        'value': 'lol',
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
        .catch(err => {
          msg.reply('There was an error while calling the API.')
          console.log(err)
        })
  }
}

function getTopChampionsOfPlayer (id) {
  LeagueApi.ChampionMastery
        .gettingBySummoner(id)
        .then(championMasteryData => {
          var topChampions = []
          for (var i = 0; i < championMasteryData.length; i++) {
            topChampions.push(LeagueApi.Champion.gettingById(championMasteryData[i].championId))
          }
          console.log('Waiting')
          Promise.all(topChampions).then(values => {
            console.log(values)
          })
        })
}

exports.Commands = Commands
exports.Category = 'League'
