export default class InviteCommand {
  public static Name = "invite";
  public static Help = "Generates a link to invite Shadow to your server.";
  public static Permissions = ["member"];
  public static Platforms = ["discord"];

  public execute(controller, context, command) {
    context.generateInvite().then(invite => {
      controller.sendMessage(context, invite);
    });
  }
}