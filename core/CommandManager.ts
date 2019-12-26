import * as klaw from "klaw"

export class CommandManager {
  private static instance: CommandManager;

  commands: Map<String, Map<String, Command>> = new Map<String, Map<String, Command>>();

  static getInstance() {
    if (!CommandManager.instance) {
      CommandManager.instance = new CommandManager();
    }
    return CommandManager.instance;
  }

  // Load all commands
  public async loadCommands() {
    const options = {
      filter: (filePath) => {
        return !filePath.endsWith(".ts") && !filePath.endsWith(".map");
      }
    }

    console.log("Let´s start to load commands");
    for await (const file of klaw(__dirname + '/Commands', options)) {
      if (file.path.endsWith(".js")) {
        console.log("Loading command: ", file.path);
        import(file.path).then(command => {
          if (command.default.platforms) {
            for (const platform of command.default.platforms) {
              if (!this.commands.has(platform)) {
                this.commands.set(platform, new Map<String, Command>());
              }
              const platformCommands = this.commands.get(platform);
              platformCommands.set(command.default.Name, command);
            }
            this.commands.set(command.default.Category, command.default);
            console.log("Command loaded: ", command.default.Name);
          } else {
            console.log("Command " + command.default.Name + " lacks of Category or platform.");
          }
        })
      }
    }
  }
  // Get command
  public getCommand(platform, name) {
    console.log("Getting command ", platform, name);
  }
}
