class InviteCommand {
  public name = "invite";
  public help = "Generates a link to invite Shadow to your server.";
  public permissions = ["member"];
  public platforms = ["discord"];

  public execute(controller, context, command) {
    context.generateInvite().then(invite => {
      controller.sendMessage(context, invite);
    });
  }
}

export default new InviteCommand();
