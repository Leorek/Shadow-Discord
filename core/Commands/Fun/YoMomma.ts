import * as Request from "request-promise";

export default class YoMommaCommand {
  public static Name = "yomomma";
  public static Help = "Sends a random joke about ur mum.";
  public static Category = "Fun";
  public static Permissions = ["member"];
  public static Platforms = ["discord", "telegram"];

  public execute(controller, context, command) {
    Request("http://api.yomomma.info/")
      .then(res => {
        var yomomma = JSON.parse(res);
        controller.sendMessage(context, yomomma.joke);
      })
      .catch(err => {
        controller.sendMessage(context, "something_went_wrong");
      });
  }
}
