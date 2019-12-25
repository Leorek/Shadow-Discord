/*~ Here, declare things that go in the global namespace, or augment
 *~ existing declarations in the global namespace
 */

type Controller = {};
type Command = {
  name: string;
  help: string;
  permissions: Array<String>;
  platforms: Array<String>;
  execute: Function;
};

type CommandRef = {
  ref: Command;
  params: Array<String>;
};
