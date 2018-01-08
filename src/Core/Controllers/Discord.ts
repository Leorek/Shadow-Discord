import * as Discord from "discord.js";
import Logger from "../Logger";
let Client = new Discord.Client();

Client.on("ready", () => {
  Logger.info("Shadow is up and ready.");
});
