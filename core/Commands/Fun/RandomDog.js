"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Request = require("request-promise");
const ramda_1 = require("ramda");
class RandomDogCommand {
    constructor() {
        this.apiURL = "https://dog.ceo/api/";
        this.breeds = [];
        this.fetchBreeds();
    }
    execute(controller, context, command) {
        if (!ramda_1.isEmpty(command.params)) {
            if (ramda_1.equals(ramda_1.head(command.params), "list")) {
                Request(this.apiURL + "breeds/list")
                    .then(res => {
                    const dog = JSON.parse(res);
                    this.breeds = dog.message;
                    controller.sendMessage(context, ramda_1.join(",", this.breeds));
                })
                    .catch(err => {
                    controller.sendMessage(context, "something_went_wrong");
                });
            }
            else {
                ramda_1.forEach(breed => {
                    if (ramda_1.contains(breed, this.breeds)) {
                        Request(this.apiURL + "breed/" + breed + "/images/random")
                            .then(res => {
                            const dog = JSON.parse(res);
                            controller.sendImage(context, dog.message);
                        })
                            .catch(err => {
                            controller.sendMessage(context, "something_went_wrong");
                        });
                    }
                }, command.params);
            }
        }
        else {
            Request(this.apiURL + "breeds/image/random")
                .then(res => {
                const dog = JSON.parse(res);
                controller.sendImage(context, dog.message);
            })
                .catch(err => {
                console.log(err);
                controller.sendMessage(context, "something_went_wrong");
            });
        }
    }
    fetchBreeds() {
        Request(this.apiURL + "breeds/list")
            .then(res => {
            const dog = JSON.parse(res);
            this.breeds = dog.message;
        })
            .catch(err => {
            console.log(err);
        });
    }
}
exports.default = RandomDogCommand;
RandomDogCommand.Name = "RandomDog";
RandomDogCommand.Help = "Sends a random picture or gif of doggies.";
RandomDogCommand.Category = "Fun";
RandomDogCommand.Permissions = ["member"];
RandomDogCommand.Platforms = ["discord", "telegram"];
//# sourceMappingURL=RandomDog.js.map