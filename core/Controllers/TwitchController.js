"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TwitchBot = require("tmi.js");
var TwitchController = /** @class */ (function () {
    function TwitchController(config, master) {
        this.prefix = "";
        this.master = master;
        this.prefix = config.prefix;
        this.bot = new TwitchBot.client({
            identity: {
                username: config.credentials.username,
                password: config.credentials.password
            },
            channels: ["#leorek"]
        });
        this.bot.connect();
        this.setupEvents();
    }
    TwitchController.prototype.setupEvents = function () {
        var _this = this;
        this.bot.on("message", function (channel, userstate, message, self) {
            if (self)
                return;
            _this.master.onMessage("twitch", message);
        });
    };
    TwitchController.prototype.getContent = function (msg) {
        return msg.content;
    };
    return TwitchController;
}());
exports.TwitchController = TwitchController;
