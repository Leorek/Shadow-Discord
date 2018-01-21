import Controller from "./Core/Controllers/MasterController";
const config = require("../config.json");

class Shadow {
  public controller;
  constructor() {
    this.controller = new Controller(config);
  }
}

var bot = new Shadow();
