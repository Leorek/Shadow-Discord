import * as Request from "request-promise";

class YoMommaCommand {
  public name = "yomomma";
  public help = "Sends a random joke about ur mum.";
  public permissions = ["member"];
  public platforms = ["discord", "telegram"];

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

export default new YoMommaCommand();
