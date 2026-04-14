require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  Partials
} = require('discord.js');

const { setSchedule, initSchedules } = require('./schedule');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ],
  partials: [Partials.Channel]
});

// 🟢 Bot ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  // 🔁 restore schedules after restart
  initSchedules(client);
});

// ⚡ Slash command handler
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // /schedule command
  if (interaction.commandName === 'schedule') {
    try {
      const hour = interaction.options.getInteger('hour');
      const minute = interaction.options.getInteger('minute');

        // 🧠 VALIDATION
        if (
        hour === null || minute === null ||
        hour < 0 || hour > 23 ||
        minute < 0 || minute > 59
        ) {
        return interaction.reply({
            content: "❌ Invalid time! Use hour (0–23) and minute (0–59).",
            ephemeral: true
        });
        }

        setSchedule(
            interaction.guild.id,
            interaction.channel,
            hour,
            minute
         );

      await interaction.reply(
        `✅ Schedule saved for **${hour}:${minute}**`
      );

    } catch (err) {
      console.error(err);

      await interaction.reply({
        content: "❌ Failed to set schedule.",
        ephemeral: true
      });
    }
  }
});

// 🔐 Login bot
client.login(process.env.TOKEN);