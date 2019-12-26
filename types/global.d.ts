/*~ Here, declare things that go in the global namespace, or augment
 *~ existing declarations in the global namespace
 */

type Controller = {};
type Command = {
  Name: string;
  Help: string;
  Category: string;
  Permissions: Array<String>;
  Platforms: Array<String>;
  execute: Function;
};

type CommandRef = {
  ref: Command;
  params: Array<String>;
};

type CommandManager = {
  loadCommands: Function;
  getCommand: Function;
}