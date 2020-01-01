import Got from "got";

export default new (class YoMommaCommand {
  public Name = "yomomma";
  public Help = "Sends a random joke about ur mum.";
  public Category = "Fun";
  public Permissions = ["member"];
  public Platforms = ["discord", "telegram"];

  public execute(context, params) {
    Got("http://api.yomomma.info/")
      .then(res => {
        var yomomma = JSON.parse(res.body);
        context.sendMessage(yomomma.joke);
      })
      .catch(err => {
        context.sendMessage("something_went_wrong");
      });
  }
})();
