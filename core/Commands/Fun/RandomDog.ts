import * as Request from "request-promise";
import { isEmpty, equals, head, join, forEach, contains } from "ramda";

class RandomDogCommand {
  public name = "randomdog";
  public help = "Sends a random picture or gif of doggies.";
  public permissions = ["member"];
  public platforms = ["discord", "telegram"];
  private apiURL = "https://dog.ceo/api/";
  private breeds = [];

  constructor() {
    this.fetchBreeds();
  }

  public execute(controller, context, command) {
    if (!isEmpty(command.params)) {
      if (equals(head(command.params), "list")) {
        Request(this.apiURL + "breeds/list")
          .then(res => {
            const dog = JSON.parse(res);
            this.breeds = dog.message;
            controller.sendMessage(context, join(",", this.breeds));
          })
          .catch(err => {
            controller.sendMessage(context, "something_went_wrong");
          });
      } else {
        forEach(breed => {
          if (contains(breed, this.breeds)) {
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
    } else {
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

  private fetchBreeds() {
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

export default new RandomDogCommand();
