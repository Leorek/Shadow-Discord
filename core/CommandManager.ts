import * as klaw from "klaw"

export class CommandManager {
  private static instance: CommandManager;

  commands: Map<String, Map<String, Command>>;

  static getInstance() {
    if (!CommandManager.instance) {
      CommandManager.instance = new CommandManager();
    }
    return CommandManager.instance;
  }

  private constructor(){
    this.commands = new Map<String, Map<String, Command>>();
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
          if (command.default.Platforms) {
            console.log("This command has platforms");
            for (const platform of command.default.Platforms) {
              console.log("Setting up platform ", platform);
              if (!this.commands.has(platform)) {
                this.commands.set(platform, new Map<String, Command>());
              }
              const platformCommands = this.commands.get(platform);
              platformCommands.set(command.default.Name, command);
              
              console.log("Command loaded: ", command.default.Name);
            }
          } else {
            console.log("Command " + command.default.Name + " lacks of Category or platform.",command.default.Platforms);
          }
        })
      }
    }
    console.log("Check: ", this.commands)
  }
  // Get command
  public getCommand(platform, commandName) {
    console.log("CHECK 2 ", CommandManager.getInstance().commands);
    console.log("Getting command ", platform, commandName);
    const platformCommands = this.commands.get(platform);
    console.log("Got this commands for the platform", platform,platformCommands);
    const command = platformCommands.get(commandName);

    return command;
  }
}
