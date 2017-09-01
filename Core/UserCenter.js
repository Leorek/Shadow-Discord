'use strict'

const Logger = require('./Logger.js').Logger
const User = require('./Models/User')

exports.userHasPermissions = function (user, command) {
  return new Promise(function (resolve, reject) {
    Logger.debug('Checking if user ' + user.username + ' has permissions to execute "' + command + '"')
    var userEntry = getUserEntry(user)
    userEntry.then(user => {
      Logger.debug('User obtained from database: ' + user)
      var hasPermission = false
      command.permissions.forEach(group => {
        if (!hasPermission && user.permissions.indexOf(group) > -1) {
          hasPermission = true
        }
      })
      resolve(hasPermission)
    }).catch(err => {
      reject(err)
    })
  })
}

function getUserEntry (user) {
  return User.find({ id: user.id })
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
    })
}
