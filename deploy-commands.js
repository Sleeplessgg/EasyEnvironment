require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

// Collect commands
const commands = [];

const commandsPath = path.join(__dirname, 'src/commands');
const folders = fs.readdirSync(commandsPath);

for (const folder of folders) {
  const files = fs.readdirSync(path.join(commandsPath, folder));

  for (const file of files) {
    const command = require(path.join(commandsPath, folder, file));

    if (command.data) {
      commands.push(command.data.toJSON());
    }
  }
}

// REST client
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Deploy
(async () => {
  try {
    console.log('🚀 Deploying slash commands...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('✅ Commands deployed successfully!');
  } catch (error) {
    console.error(error);
  }
})();