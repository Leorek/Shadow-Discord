import AllCommands from "./Commands";
var Commands = [];
var DiscordCommands = [];
var TelegramCommands = [];

for (var group in AllCommands) {
  for (var commandKey in AllCommands[group]) {
    let command = AllCommands[group][commandKey];

    if (hasSupportFor("discord", commandKey)) {
      DiscordCommands[group][commandKey] = command;
    }
    if (hasSupportFor("telegram", commandKey)) {
      TelegramCommands[group][commandKey] = command;
    }
  }
}

function hasSupportFor(platform, command) {
  return AllCommands[group][command]["platforms"].indexOf(platform) > -1;
}
export { DiscordCommands, TelegramCommands };
