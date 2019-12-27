"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request = require("request-promise");
var ramda_1 = require("ramda");
var RandomDogCommand = /** @class */ (function () {
    function RandomDogCommand() {
        this.apiURL = "https://dog.ceo/api/";
        this.breeds = [];
        this.fetchBreeds();
    }
    RandomDogCommand.prototype.execute = function (controller, context, command) {
        var _this = this;
        if (!ramda_1.isEmpty(command.params)) {
            if (ramda_1.equals(ramda_1.head(command.params), "list")) {
                Request(this.apiURL + "breeds/list")
                    .then(function (res) {
                    var dog = JSON.parse(res);
                    _this.breeds = dog.message;
                    controller.sendMessage(context, ramda_1.join(",", _this.breeds));
                })
                    .catch(function (err) {
                    controller.sendMessage(context, "something_went_wrong");
                });
            }
            else {
                ramda_1.forEach(function (breed) {
                    if (ramda_1.contains(breed, _this.breeds)) {
                        Request(_this.apiURL + "breed/" + breed + "/images/random")
                            .then(function (res) {
                            var dog = JSON.parse(res);
                            controller.sendImage(context, dog.message);
                        })
                            .catch(function (err) {
                            controller.sendMessage(context, "something_went_wrong");
                        });
                    }
                }, command.params);
            }
        }
        else {
            Request(this.apiURL + "breeds/image/random")
                .then(function (res) {
                var dog = JSON.parse(res);
                controller.sendImage(context, dog.message);
            })
                .catch(function (err) {
                console.log(err);
                controller.sendMessage(context, "something_went_wrong");
            });
        }
    };
    RandomDogCommand.prototype.fetchBreeds = function () {
        var _this = this;
        Request(this.apiURL + "breeds/list")
            .then(function (res) {
            var dog = JSON.parse(res);
            _this.breeds = dog.message;
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    RandomDogCommand.Name = "RandomDog";
    RandomDogCommand.Help = "Sends a random picture or gif of doggies.";
    RandomDogCommand.Category = "Fun";
    RandomDogCommand.Permissions = ["member"];
    RandomDogCommand.Platforms = ["discord", "telegram"];
    return RandomDogCommand;
}());
exports.default = RandomDogCommand;
