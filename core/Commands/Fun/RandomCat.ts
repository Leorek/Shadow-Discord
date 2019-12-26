import * as Request from "request-promise";

export default class RandomCatCommand {
  public static Name = "RandomDog";
  public static Help = "Sends a random picture or gif of cats.";
  public static Category = "Fun"
  public static Permissions = ["member"];
  public static Platforms = ["discord", "telegram"];

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
