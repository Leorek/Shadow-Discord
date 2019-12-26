import * as Request from "request-promise";

export default class YesNoCommand {
  public static Name = "yesno";
  public static Help = "Sends a random gif or picture with yes or no";
  public static Category = "Fun";
  public static Permissions = ["member"];
  public static Platforms = ["discord", "telegram"];

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