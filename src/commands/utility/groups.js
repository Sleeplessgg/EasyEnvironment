const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require('discord.js');

const groupService = require('../../services/groupService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('groups')
    .setDescription('Manage message groups'),

  async execute(interaction) {

    try {
      const guildId = interaction.guild.id;

      const groups = await groupService.getGuildGroups(guildId) || [];

      let description = '';

      if (groups.length === 0) {
        description = 'No groups found. Create one first.';
      } else {
        for (const g of groups) {
          description += `**${g.groupId}.** ${g.name}\n`;
        }
      }

      const embed = new EmbedBuilder()
        .setTitle('Message Groups')
        .setDescription(description)
        .setColor(0x2B2D31);

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('add_group')
          .setLabel('Create Group')
          .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
          .setCustomId('delete_group')
          .setLabel('Delete Group')
          .setStyle(ButtonStyle.Danger)
      );

      return await interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: true
      });

    } catch (err) {
      console.error('❌ /groups error:', err);

      if (!interaction.replied) {
        return interaction.reply({
          content: '❌ Failed to load groups.',
          ephemeral: true
        });
      }
    }
  }
};