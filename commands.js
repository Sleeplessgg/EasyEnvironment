const {SlashCommandBuilder} = require('discord.js');

module.exports = [
    //SCHEDULE RECEIVE
  new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Set the Schedule for the Daily Weather')
    .addIntegerOption(option =>
      option.setName('hour')
        .setDescription('Hour of the day (0-23)')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('minute')
        .setDescription('Minute of the hour (0-59)')
        .setRequired(true))
    .addBooleanOption(option =>
      option.setName('enable')
        .setDescription('Enable or disable the schedule')
        .setRequired(true))
];