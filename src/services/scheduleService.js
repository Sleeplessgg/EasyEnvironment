const cron = require('node-cron');
const { loadData, saveData } = require('../utils/storage');

const messageService = require('./messageService');
const { buildRandomMessageEmbed } = require('../utils/buildRandomMessageEmbed');

const jobs = new Map();

// ======================================================
// MESSAGE SCHEDULE SETUP
// ======================================================
function setSchedule(guildId, channel, hour, minute, enabled = true) {
  const data = loadData();

  data.guilds = data.guilds || {};

  data.guilds[guildId] = {
    hour,
    minute,
    enabled,
    channelId: channel.id
  };

  saveData(data);

  if (!enabled) return;

  startJob(guildId, channel, hour, minute);
}

// ======================================================
// CRON JOB
// ======================================================
function startJob(guildId, channel, hour, minute) {

  const cronTime = `${minute} ${hour} * * *`;

  if (jobs.has(guildId)) {
    jobs.get(guildId).stop();
  }

  const job = cron.schedule(cronTime, async () => {
    try {

      const message =
        await messageService.getRandomMessageFromGuildService(guildId);

      const embed = buildRandomMessageEmbed(message);

      channel.send({ embeds: [embed] });

    } catch (err) {
      console.error('Cron error:', err);
    }
  });

  jobs.set(guildId, job);
}

// ======================================================
// RESTORE JOBS ON START
// ======================================================
function initSchedules(client) {

  const data = loadData();

  for (const guildId in data.guilds) {

    const s = data.guilds[guildId];

    if (!s.enabled) continue;

    client.channels.fetch(s.channelId)
      .then(channel => {
        startJob(guildId, channel, s.hour, s.minute);
      })
      .catch(() => {});
  }

  console.log("Schedules restored:", Object.keys(data.guilds).length);
}

module.exports = {
  setSchedule,
  initSchedules
};