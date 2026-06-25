require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const { loadCommands } = require('./handlers/commandHandler');
const { loadEvents } = require('./handlers/eventHandler');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Map();

loadCommands(client);
loadEvents(client);

client.login(process.env.TOKEN);