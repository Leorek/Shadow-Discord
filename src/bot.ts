import Controller from "./Core/Controllers/MasterController";
import Language from "./Core/Language";
const config = require("../config.json");

class Shadow {
  public controller;
  constructor() {
    this.controller = new Controller(config);
  }
}

var bot = new Shadow();
