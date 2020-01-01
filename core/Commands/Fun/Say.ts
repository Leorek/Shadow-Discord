export default new (class SayCommand {
  public Name = "Say";
  public Help = "Repeats what you say!";
  public Category = "Fun";
  public Permissions = ["member"];
  public Platforms = ["discord", "telegram"];

  execute(context, params) {
    if (params.length > 0) {
      const message = params.join(" ");
      context.sendMessage(message, true);
    } else {
      context.sendMessage("I can't say nothing :3", true);
    }
  }
})();
