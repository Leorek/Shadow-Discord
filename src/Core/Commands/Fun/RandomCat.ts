import * as Request from "request-promise";

class RandomCatCommand {
  public name = "randomcat";
  public help = "Sends a random picture or gif of cats.";
  public permissions = ["member"];
  public platforms = ["discord", "telegram"];

  public execute(controller, context, command) {
    Request("http://random.cat/meow")
      .then(res => {
        const cat = JSON.parse(res);
        controller.sendImage(context, cat.file);
      })
      .catch(err => {
        controller.sendMessage(context, "something_went_wrong");
      });
  }
}

export default new RandomCatCommand();
