import Got from "got";

export default new (class RandomDogCommand {
  public Name = "RandomDog";
  public Help = "Sends a random picture or gif of doggies.";
  public Category = "Fun";
  public Permissions = ["member"];
  public Platforms = ["discord", "telegram"];

  private request = Got.extend({
    prefixUrl: "https://dog.ceo/api/"
  });

  public execute(context, params) {
    if (params.length > 0) {
      if ("list" === params[0]) {
        this.fetchBreedsList(context);
      } else {
        this.fetchRandomDogByBreed(context, params[0]);
      }
    } else {
      this.fetchRandomDog(context);
    }
  }

  private fetchRandomDog(context) {
    this.request("breeds/image/random")
      .then(res => {
        const dog = JSON.parse(res.body);
        context.sendImage(dog.message);
      })
      .catch(err => {
        context.sendMessage("something_went_wrong");
      });
  }

  private fetchBreedsList(context) {
    this.request("breeds/list")
      .then(res => {
        const dog = JSON.parse(res.body);
        const breeds = dog.message;
        context.sendMessage(breeds.join(","));
      })
      .catch(err => {
        context.sendMessage("something_went_wrong");
      });
  }

  private fetchRandomDogByBreed(context, breed) {
    this.request(`breed/${breed}/images/random`)
      .then(res => {
        const dog = JSON.parse(res.body);
        context.sendImage(dog.message);
      })
      .catch(err => {
        context.sendMessage("something_went_wrong");
      });
  }
})();
