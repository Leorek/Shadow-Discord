import * as klaw from "klaw"

export class CommandManager {
  platform: string;
  commands: Map<String, Map<String, Command>> = new Map<String, Map<String, Command>>();

  constructor(platform: string){
    this.platform = platform;
  }
  // Load all commands
  public loadCommands = async () => {
    const options = {
      filter: (filePath) => {
        return !filePath.endsWith(".ts") && !filePath.endsWith(".map");
      }
    }

    for await (const file of klaw(__dirname + '/Commands', options)) {
      if (file.path.endsWith(".js")) {
        import(file.path).then(command => {
          if (command.default.Platforms) {
            for (const platform of command.default.Platforms) {
              if (!this.commands.has(platform)) {
                this.commands.set(platform, new Map<String, Command>());
              }
              const platformCommands = this.commands.get(platform);
              platformCommands.set(command.default.Name.toLowerCase(), command.default);
            }
          } else {
            console.log("Command " + command.default.Name + " lacks of Category or platform.",command.default.Platforms);
          }
        })
      }
    }
  }
  // Get command
  public getCommand = (platform, commandName) => {
    const platformCommands = this.commands.get(platform);
    const command = platformCommands.get(commandName.toLowerCase());
    return command;
  }
}