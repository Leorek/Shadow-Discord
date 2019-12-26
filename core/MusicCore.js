// import * as Google from "googleapis";
// import * as YTDL from "ytdl-core";
// const Youtube = Google.youtube("v3");
// const Config = require("../../config.json");
// const Logger = require("../Logger.js").Logger;
// Google.options({ auth: Config.apiKeys.youtube });
// var client = null;
// var MAX_QUEUE_SIZE = (Config.music && Config.music.maxQueueSize) || 20;
// var TIMEOUT = (Config.music && Config.music.timeout) || 180000;
// var DEFAULT_VOLUME = (Config.music && Config.music.volume) || 50;
// var queues = {};
// var queueTimeout = null;
// class MusicCore {
//   play() { }
//   getQueue(server) {
//     if (!queues[server]) queues[server] = [];
//     return queues[server];
//   }
//   queueFull(server) {
//     return this.getQueue(server).length >= MAX_QUEUE_SIZE;
//   }
// }
// export default new MusicCore();
//# sourceMappingURL=MusicCore.js.map