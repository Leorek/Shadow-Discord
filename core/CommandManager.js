"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const klaw = require("klaw");
class CommandManager {
    constructor() {
        this.commands = new Map();
    }
    static getInstance() {
        if (!CommandManager.instance) {
            CommandManager.instance = new CommandManager();
        }
        return CommandManager.instance;
    }
    // Load all commands
    loadCommands() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                filter: (filePath) => {
                    return !filePath.endsWith(".ts") && !filePath.endsWith(".map");
                }
            };
            console.log("Let´s start to load commands");
            try {
                for (var _b = __asyncValues(klaw(__dirname + '/Commands', options)), _c; _c = yield _b.next(), !_c.done;) {
                    const file = _c.value;
                    if (file.path.endsWith(".js")) {
                        console.log("Loading command: ", file.path);
                        Promise.resolve().then(() => require(file.path)).then(command => {
                            if (command.default.Platforms) {
                                console.log("This command has platforms");
                                for (const platform of command.default.Platforms) {
                                    console.log("Setting up platform ", platform);
                                    if (!this.commands.has(platform)) {
                                        this.commands.set(platform, new Map());
                                    }
                                    const platformCommands = this.commands.get(platform);
                                    platformCommands.set(command.default.Name, command);
                                    console.log("Command loaded: ", command.default.Name);
                                }
                            }
                            else {
                                console.log("Command " + command.default.Name + " lacks of Category or platform.", command.default.Platforms);
                            }
                        });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            console.log("Check: ", this.commands);
        });
    }
    // Get command
    getCommand(platform, commandName) {
        console.log("CHECK 2 ", CommandManager.getInstance().commands);
        console.log("Getting command ", platform, commandName);
        const platformCommands = this.commands.get(platform);
        console.log("Got this commands for the platform", platform, platformCommands);
        const command = platformCommands.get(commandName);
        return command;
    }
}
exports.CommandManager = CommandManager;
//# sourceMappingURL=CommandManager.js.map