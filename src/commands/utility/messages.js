const { SlashCommandBuilder } = require('discord.js');
const { buildMessagesEmbed } = require('../../utils/buildMessagesEmbed');
const messageService = require('../../services/messageService');
const groupService = require('../../services/groupService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('messages')
    .setDescription('View messages')
    .addStringOption(option =>
      option
        .setName('group')
        .setDescription('Filter messages by group number (optional)')
        .setRequired(false)
    ),

  async execute(interaction) {

    const groupInput = interaction.options.getString('group');

    // convert input → number or null
    const group =
      groupInput === null
        ? null
        : Number(groupInput);

    const result = await buildMessagesEmbed(
      messageService,
      groupService,
      interaction.guild.id,
      group,
      0
    );

    return interaction.reply({
      embeds: [result.embed],
      components: [result.row]
    });
  }
};