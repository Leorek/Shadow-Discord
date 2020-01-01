"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var got_1 = require("got");
exports.default = new (/** @class */ (function () {
    function RandomDogCommand() {
        this.Name = "RandomDog";
        this.Help = "Sends a random picture or gif of doggies.";
        this.Category = "Fun";
        this.Permissions = ["member"];
        this.Platforms = ["discord", "telegram"];
        this.request = got_1.default.extend({
            prefixUrl: "https://dog.ceo/api/"
        });
    }
    RandomDogCommand.prototype.execute = function (context, params) {
        if (params.length > 0) {
            if ("list" === params[0]) {
                this.fetchBreedsList(context);
            }
            else {
                this.fetchRandomDogByBreed(context, params[0]);
            }
        }
        else {
            this.fetchRandomDog(context);
        }
    };
    RandomDogCommand.prototype.fetchRandomDog = function (context) {
        this.request("breeds/image/random")
            .then(function (res) {
            var dog = JSON.parse(res.body);
            context.sendImage(dog.message);
        })
            .catch(function (err) {
            context.sendMessage("something_went_wrong");
        });
    };
    RandomDogCommand.prototype.fetchBreedsList = function (context) {
        this.request("breeds/list")
            .then(function (res) {
            var dog = JSON.parse(res.body);
            var breeds = dog.message;
            context.sendMessage(breeds.join(","));
        })
            .catch(function (err) {
            context.sendMessage("something_went_wrong");
        });
    };
    RandomDogCommand.prototype.fetchRandomDogByBreed = function (context, breed) {
        this.request("breed/" + breed + "/images/random")
            .then(function (res) {
            var dog = JSON.parse(res.body);
            context.sendImage(dog.message);
        })
            .catch(function (err) {
            context.sendMessage("something_went_wrong");
        });
    };
    return RandomDogCommand;
}()))();
