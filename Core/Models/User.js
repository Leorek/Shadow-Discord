const Mongo = require('mongoose')

const userSchema = Mongo.Schema(
  {
    id: String,
    banned: Boolean,
    permissions: [String]
  }
)

Mongo.Promise = global.Promise
Mongo.connect('mongodb://localhost:27017/shadow-db', {
  useMongoClient: true
})

module.exports = Mongo.model('user', userSchema)
