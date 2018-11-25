import * as Request from "request-promise";

class YesNoCommand {
  public name = "yesno";
  public help = "Sends a random gif or picture with yes or no";
  public permissions = ["member"];
  public platforms = ["discord", "telegram"];

  public execute(controller, context, command) {
    Request("https://yesno.wtf/api/")
      .then(res => {
        var yesno = JSON.parse(res);
        controller.sendImage(context, yesno.image);
      })
      .catch(err => {
        controller.sendMessage(context, "something_went_wrong");
      });
  }
}

export default new YesNoCommand();
