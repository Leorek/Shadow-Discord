const Fs = require("fs");
const MakeDir = require("make-dir");

if (!Fs.existsSync("./Logs/")) {
  MakeDir.sync("./Logs/");
}

var Bunyan = require("bunyan");
var Logger = Bunyan.createLogger({
  name: "Shadow",
  streams: [
    {
      level: "info",
      path: "./Logs/info.log"
    },
    {
      level: "error",
      path: "./Logs/error.log"
    },
    {
      level: "fatal",
      path: "./Logs/fatal.log"
    },
    {
      level: "warn",
      path: "./Logs/warn.log"
    },
    {
      level: "debug",
      path: "./Logs/debug.log"
    },
    {
      level: "trace",
      path: "./Logs/trace.log"
    }
  ]
});

export default Logger;
