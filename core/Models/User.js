"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongo = require("mongoose");
Mongo.Promise = global.Promise;
Mongo.connect("mongodb://54.37.155.140:27017/shadow-db", {
    useMongoClient: true
});
const userSchema = Mongo.Schema({
    id: String,
    banned: Boolean,
    permissions: [String]
});
function userModel(platform) {
    return Mongo.model(platform + "-user", userSchema);
}
exports.userModel = userModel;
//# sourceMappingURL=User.js.map