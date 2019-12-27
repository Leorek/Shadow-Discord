import * as DiscordBot from "discord.js";
import {CommandManager} from "../CommandManager";

export class DiscordController {
  public platform = "discord";
  public prefix = "";
  private bot;
  private commands;
  private shared;

  constructor(config, shared) {
    this.shared = shared;
    this.prefix = config.prefix;
    this.commands = new CommandManager(this.platform);
    this.bot = new DiscordBot.Client();
    this.bot.login(config.token);
    this.setupEvents();
  }

  setupEvents() {
    this.bot.on("message", this.onMessage);
  }

  private onMessage = context => {
    // Check which command is
    const name = "";
    // Get params of command
    const params = {};
    // Execute command
    const command: any = this.commands.getCommand(this.platform, name);
    command.execute(new DiscordContext(context), params);
  };
}

class DiscordContext {
  context: any;

  constructor(context) {
    this.context = context;
  }

  public getContent() {
    return this.context.content;
  }

  public sendMessage(message) {
    this.context.channel.send(message);
  }

  public sendImage(image) {
    this.context.channel.send(image);
  }
}
