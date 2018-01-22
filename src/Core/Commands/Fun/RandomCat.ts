import * as Request from "request-promise";

class RandomCatCommand {
  public name = "randomcat";
  public help = "Sends a random picture or gif of cats.";
  public permissions = ["member"];
  public platforms = ["discord", "telegram"];

  public execute(controller, context, command, lang, master) {
    switch (controller.platform) {
      case "discord":
        this.discord(command, context, lang);
        break;
      case "telegram":
        this.telegram(command, context, lang);
        break;
    }
  }

  private discord(command, ctx, lang) {
    this.common()
      .then(res => {
        const cat = JSON.parse(res);
        ctx.channel.send(cat.file);
      })
      .catch(err => {
        ctx.channel.send(lang.__("something_went_wrong"));
      });
  }

  private telegram(command, context, lang) {
    this.common()
      .then(res => {
        const cat = JSON.parse(res);
        if (this.isGif(cat.file)) {
          context.replyWithDocument(cat.file);
        } else {
          context.replyWithPhoto(cat.file);
        }
      })
      .catch(err => {
        context.reply(lang.__("something_went_wrong"));
      });
  }

  common() {
    return Request("http://random.cat/meow");
  }

  isGif(file) {
    const gifValidator = new RegExp("(.*?).(gif)$");
    console.log("Is gif: " + gifValidator.test(file));
    return gifValidator.exec(file);
  }
}

export default new RandomCatCommand();
