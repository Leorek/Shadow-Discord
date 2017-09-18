const Mongo = require('mongoose')

const leagueChampionSchema = Mongo.Schema(
  {
    id: Number,
    title: String,
    key: String,
    name: String
  }
)

Mongo.Promise = global.Promise
Mongo.connect('mongodb://localhost:27017/shadow-db', {
  useMongoClient: true
})

module.exports = Mongo.model('leagueChampion', leagueChampionSchema)
