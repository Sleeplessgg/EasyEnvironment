const { SlashCommandBuilder } = require('discord.js');
const { setSchedule } = require('../../services/scheduleService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Set the Schedule for the Daily Weather')
    .addIntegerOption(option =>
      option.setName('hour')
        .setDescription('Hour (0-23)')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('minute')
        .setDescription('Minute (0-59)')
        .setRequired(true))
    .addBooleanOption(option =>
      option.setName('enable')
        .setDescription('Enable schedule')
        .setRequired(true)
    ),

  async execute(interaction) {
    const hour = interaction.options.getInteger('hour');
    const minute = interaction.options.getInteger('minute');
    const enable = interaction.options.getBoolean('enable');

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      return interaction.reply({
        content: "❌ Invalid time",
        ephemeral: true
      });
    }

    setSchedule(
      interaction.guild.id,
      interaction.channel,
      hour,
      minute,
      enable
    );

    await interaction.reply(
      `✅ Schedule saved for ${hour}:${minute}`
    );
  }
};