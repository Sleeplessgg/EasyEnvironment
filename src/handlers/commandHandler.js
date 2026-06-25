const fs = require('fs');
const path = require('path');

function loadCommands(client) {
  const commandsPath = path.join(__dirname, '../commands');

  const folders = fs.readdirSync(commandsPath);

  for (const folder of folders) {
    const files = fs.readdirSync(path.join(commandsPath, folder));

    for (const file of files) {
      const command = require(path.join(commandsPath, folder, file));

      if (!command.data || !command.execute) continue;

      client.commands.set(command.data.name, command);
    }
  }
}

module.exports = { loadCommands };