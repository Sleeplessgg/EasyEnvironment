const { EmbedBuilder } = require('discord.js');

function buildRandomMessageEmbed(message) {

  if (!message) {
    return new EmbedBuilder()
      .setTitle("No messages found")
      .setDescription("There are no messages in this guild.")
      .setColor(0x2B2D31);
  }

  const lines = message.content.split('\n');

  const title = lines.shift(); // first line
  const description = lines.join('\n'); // rest

  return new EmbedBuilder()
    .setTitle(title || "Message")
    .setDescription(description || " ")
    .setColor(0x2B2D31);
}

module.exports = { buildRandomMessageEmbed };