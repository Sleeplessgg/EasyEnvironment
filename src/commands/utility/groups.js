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

    const guildId = interaction.guild.id;

    const groups = await groupService.getGuildGroups(guildId);

    let description = '';

    if (!groups.length) {
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

    return interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true
    });
  }
};