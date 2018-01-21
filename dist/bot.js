"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MasterController_1 = require("./Core/Controllers/MasterController");
const config = require("../config.json");
class Shadow {
    constructor() {
        this.controller = new MasterController_1.default(config);
    }
}
var bot = new Shadow();
//# sourceMappingURL=bot.js.map