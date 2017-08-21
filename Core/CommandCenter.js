'use strict'

var directory = require('require-directory');

var Commands = directory(module, './Commands');
var FunctionalCommands = []

for (var group in Commands) {
  for (var command in Commands[group].Commands) {
    FunctionalCommands[command] = Commands[group].Commands[command];
  }
}

exports.Commands = FunctionalCommands