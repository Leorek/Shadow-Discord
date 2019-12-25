import * as Request from "request-promise";

class RandomCatCommand {
  public name = "randomcat";
  public help = "Sends a random picture or gif of cats.";
  public permissions = ["member"];
  public platforms = ["discord", "telegram"];

  public execute(context, command) {
    Request("http://random.cat/meow")
      .then(res => {
        const cat = JSON.parse(res);
        context.sendImage(cat.file);
      })
      .catch(err => {
        context.sendMessage("something_went_wrong");
      });
  }
}

export default new RandomCatCommand();
