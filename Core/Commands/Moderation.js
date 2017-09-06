var Commands = []
const User = require('../Models/User')

Commands.role = {
  name: 'role',
  help: 'Add/remove an specified role from a user.',
  permissions: ['member'],
  fn: function (msg, suffix, lang) {
    
    /*User.find({ id: user.id })
    .then(users => {
      if (users.length === 0) {
        Logger.debug(user.username + ' is not on the database, creating record.')
        var newUser = new User({
          id: user.id,
          banned: false,
          permissions: ['member']
        })
        newUser.save()
        Logger.debug(newUser)
        return newUser
      } else {
        Logger.debug(user.username + ' found on database.')
        return users[0]
      }
    })*/
  }
}

exports.Commands = Commands
exports.Category = 'Moderation'
