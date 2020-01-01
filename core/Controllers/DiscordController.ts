import * as DiscordBot from "discord.js";
import { CommandManager } from "../CommandManager";

export class DiscordController {
  private platform = "discord";
  private bot;
  private commands: CommandManager;
  public prefix = "";

  constructor(config) {
    this.prefix = config.defaultPrefix;
    this.commands = new CommandManager(this.platform);
    this.commands.loadCommands();
    this.bot = new DiscordBot.Client();
    this.bot.login(config.token);
    this.setupEvents();
  }

  setupEvents() {
    this.bot.on("message", this.onMessage);
  }

  private onMessage = context => {
    const text = context.content;

    if (text.startsWith(this.prefix)) {
      const textSplit = text.split(" ");
      // Check which command is
      const name = textSplit[0].substr(1); // In order to remove the prefix
      // Get params of command
      const params = textSplit.length > 1 ? textSplit.slice(1) : [];
      // Execute command
      const command: any = this.commands.getCommand(this.platform, name);

      if (command) {
        const commandContext = new DiscordContext(context);
        command.execute(commandContext, params);
      }
    }
  };
}

class DiscordContext {
  context: any;

  constructor(context) {
    this.context = context;
  }

  public getVoiceChannel() {
    return this.context.member.voiceChannel;
  }

  public getContent() {
    return this.context.content;
  }

  public sendMessage(message, tts) {
    if (tts) {
      this.context.channel.send(message, { tts: true });
    } else {
      this.context.channel.send(message);
    }
  }

  public sendImage(image) {
    this.context.channel.send(image);
  }
}
