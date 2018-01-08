import TelegramController from "./Core/Controllers/TelegramController";
import { TelegramCommands } from "./Core/CommandsCenter";
import Language from "./Core/Language";

let telegramToken = "393214262:AAGydy9itV4AFlLcsMGVnwb2ej9lk4bZyW0";

export default class Shadow {
  public telegram;
  constructor() {
    this.telegram = new TelegramController(telegramToken, TelegramCommands);
  }
}

var server = new Shadow();
