import Got from "got";

export default new (class YesNoCommand {
  public Name = "yesno";
  public Help = "Sends a random gif or picture with yes or no";
  public Category = "Fun";
  public Permissions = ["member"];
  public Platforms = ["discord", "telegram"];

  public execute(context, params) {
    Got("https://yesno.wtf/api/")
      .then(res => {
        var yesno = JSON.parse(res.body);
        context.sendImage(yesno.image);
      })
      .catch(err => {
        context.sendMessage("something_went_wrong");
      });
  }
})();
