const { EmbedBuilder } = require('discord.js');

async function buildGroupsEmbed(groupService, guildId) {

  const groups = await groupService.getGuildGroups(guildId);

  let description = '';

  if (!groups.length) {
    description = 'No groups available.';
  } else {
    for (const g of groups) {
      description += `**${g.groupId}.** ${g.name}\n`;
    }
  }

  const embed = new EmbedBuilder()
    .setTitle('Groups')
    .setDescription(description)
    .setColor(0x2B2D31);

  return { embed };
}

module.exports = { buildGroupsEmbed };