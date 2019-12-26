"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("./Logger");
const User_1 = require("./Models/User");
const ramda_1 = require("ramda");
function userHasPermissions(controller, context, command) {
    return new Promise(function (resolve, reject) {
        var userEntry = getUserEntry(controller.getUserId(context), controller.platform);
        userEntry
            .then(user => {
            resolve(ramda_1.contains(ramda_1.head(user.permissions), command.ref.permissions));
        })
            .catch(err => {
            reject(err);
        });
    });
}
exports.userHasPermissions = userHasPermissions;
function getUserEntry(user, platform) {
    let User = User_1.userModel(platform);
    return User.find({ id: user.id }).then(users => {
        if (users.length === 0) {
            Logger_1.default.debug(user.username + " is not on the database, creating record.");
            let newUser = new User({
                id: user.id,
                banned: false,
                permissions: ["member"]
            });
            newUser.save();
            Logger_1.default.debug(newUser);
            return newUser;
        }
        else {
            Logger_1.default.debug(user.username + " found on database.");
            return users[0];
        }
    });
}
//# sourceMappingURL=UsersManagement.js.map