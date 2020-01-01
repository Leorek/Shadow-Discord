import Got from "got";

export default new (class RandomCatCommand {
  public Name = "RandomCat";
  public Help = "Sends a random picture or gif of cats.";
  public Category = "Fun";
  public Permissions = ["member"];
  public Platforms = ["discord", "telegram"];

  execute = (context, params) => {
    Got("http://aws.random.cat/meow")
      .then(res => {
        const cat = JSON.parse(res.body);
        context.sendImage(cat.file);
      })
      .catch(err => {
        context.sendMessage("something_went_wrong");
      });
  };
})();