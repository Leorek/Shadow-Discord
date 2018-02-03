import Logger from "./Logger";
import { userModel } from "./Models/User";
import { contains, head } from "ramda";

export function userHasPermissions(controller, context, command) {
  return new Promise(function(resolve, reject) {
    var userEntry = getUserEntry(
      controller.getUserId(context),
      controller.platform
    );
    userEntry
      .then(user => {
        resolve(contains(head(user.permissions), command.ref.permissions));
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getUserEntry(user, platform) {
  let User = userModel(platform);
  return User.find({ id: user.id }).then(users => {
    if (users.length === 0) {
      Logger.debug(user.username + " is not on the database, creating record.");
      let newUser = new User({
        id: user.id,
        banned: false,
        permissions: ["member"]
      });
      newUser.save();
      Logger.debug(newUser);
      return newUser;
    } else {
      Logger.debug(user.username + " found on database.");
      return users[0];
    }
  });
}
