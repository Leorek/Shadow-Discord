// var Commands = []
// const User = require('../Models/User')
// const Logger = require('../Logger.js').Logger

// Commands.perm = {
//   name: 'perm',
//   help: 'Add/remove an specified permission from a user.',
//   permissions: ['member'],
//   fn: function (msg, suffix, lang) {
//     var suffixSplitted = suffix.split(' ')
//     var user = suffixSplitted[0]
//     var permission = suffixSplitted[2]
//     var operation = suffixSplitted[1]
//     Logger.info(suffix)

//     if (!user) {
//       msg.reply(lang.__('perm_no_user_specified'))
//     } else {
//       user = user.substring(2, user.length - 1)
//       User.find({ id: user })
//         .then(users => {
//           if (users.length === 0) {
//             Logger.debug("The user specified doesn't exists")
//             msg.reply("The user specified doesn't exists")
//           } else {
//             Logger.debug('User found on database.')
//             switch (operation) {
//               case 'add':
//                 addPermission(permission, users[0], msg, lang)
//                 break
//               case 'remove':
//                 removePermission(permission, users[0], msg, lang)
//                 break
//               default:
//                 showPermissions(users[0], msg, lang)
//             }
//           }
//         }).catch(err => {
//           Logger.error(err)
//         })
//     }
//   }
// }

// function addPermission (permission, user, msg, lang) {
//   if (!permission) {
//     msg.reply(lang.__('perm_no_permission_specified'))
//   } else {
//     var permissionPosition = user.permissions.indexOf(permission)
//     if (permissionPosition > -1) {
//       msg.reply(lang.__('perm_add_already_have'))
//     } else {
//       user.permissions.push(permission)
//       user.save()
//       msg.reply(lang.__('perm_add_successfull'))
//     }
//   }
// }

// function removePermission (permission, user, msg, lang) {
//   var permissionPosition = user.permissions.indexOf(permission)
//   if (permissionPosition > -1) {
//     user.permissions.splice(permissionPosition, 1)
//     user.save()
//     msg.reply(lang.__('perm_remove_successfull'))
//   } else {
//     msg.reply(lang.__('perm_remove_not_have'))
//   }
// }

// function showPermissions (user, msg, lang) {
//   msg.reply('This user have: ' + user.permissions.join(' , '))
// }

// exports.Commands = Commands
// exports.Category = 'Moderation'
