const {
  SlashCommandBuilder,
  EmbedBuilder
} = require('discord.js');

const groupService = require('../../services/groupService');
const rotationService = require('../../services/rotationService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('interval')
    .setDescription('Manage group rotation system')

    .addIntegerOption(option =>
      option
        .setName('days')
        .setDescription('Interval in days for group rotation')
        .setRequired(false)
    )

    .addStringOption(option =>
      option
        .setName('start_date')
        .setDescription('Start date (YYYY-MM-DD)')
        .setRequired(false)
    )

    .addBooleanOption(option =>
      option
        .setName('enabled')
        .setDescription('Enable automatic group rotation')
        .setRequired(false)
    ),

  async execute(interaction) {

    const guildId = interaction.guild.id;

    const days = interaction.options.getInteger('days');
    const startDate = interaction.options.getString('start_date');
    const enabled = interaction.options.getBoolean('enabled');

    const hasInput =
      days !== null ||
      startDate !== null ||
      enabled !== null;

    // ======================================================
    // 👀 VIEW MODE (no arguments)
    // ======================================================
    if (!hasInput) {

      const existing = rotationService.getGroupSchedule(guildId);

      if (!existing) {
        return interaction.reply({
          content: 'ℹ️ No rotation configuration found.',
          ephemeral: true
        });
      }

      const embed = new EmbedBuilder()
        .setTitle('🔁 Current Rotation Settings')
        .setColor(0x2B2D31)
        .addFields(
          {
            name: 'Interval',
            value: `${existing.intervalDays ?? 'Not set'} days`,
            inline: true
          },
          {
            name: 'Start Date',
            value: existing.startDate
              ? new Date(existing.startDate).toISOString().split('T')[0]
              : 'Not set',
            inline: true
          },
          {
            name: 'Enabled',
            value: existing.enabled ? 'Yes' : 'No',
            inline: true
          },
          {
            name: 'Active Group',
            value: String(existing.activeGroup ?? 0),
            inline: true
          }
        );

      return interaction.reply({
        embeds: [embed],
        ephemeral: true
      });
    }

    // ======================================================
    // ⚙️ SET MODE (must provide full config)
    // ======================================================
    if (!days || !startDate || enabled === null) {
      return interaction.reply({
        content: '❌ To set config, provide: days, start_date, enabled',
        ephemeral: true
      });
    }

    const parsedDate = new Date(startDate);

    if (isNaN(parsedDate.getTime())) {
      return interaction.reply({
        content: '❌ Invalid date format. Use YYYY-MM-DD.',
        ephemeral: true
      });
    }

    const groups = await groupService.getGuildGroups(guildId);

    if (!groups || groups.length < 2) {
      return interaction.reply({
        content: '❌ You need at least 2 groups to use rotation.',
        ephemeral: true
      });
    }

    // SAVE CONFIG
    rotationService.setGroupSchedule(
      guildId,
      days,
      parsedDate.getTime(),
      enabled
    );

    // SHOW UPDATED VALUES (NOT OLD DATA)
    const embed = new EmbedBuilder()
      .setTitle('🔁 Rotation Updated')
      .setColor(0x2B2D31)
      .addFields(
        {
          name: 'Interval',
          value: `${days} days`,
          inline: true
        },
        {
          name: 'Start Date',
          value: startDate,
          inline: true
        },
        {
          name: 'Enabled',
          value: enabled ? 'Yes' : 'No',
          inline: true
        }
      );

    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};