const cron = require('node-cron');
const { randomEmbed } = require('../utils/messages');
const { loadData, saveData } = require('../utils/storage');

const jobs = new Map();

function setSchedule(guildId, channel, hour, minute, enabled = true) {
  const data = loadData();

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

function startJob(guildId, channel, hour, minute) {
  const cronTime = `${minute} ${hour} * * *`;

  if (jobs.has(guildId)) {
    jobs.get(guildId).stop();
  }

  const job = cron.schedule(cronTime, async () => {
    const embed = randomEmbed();
    channel.send({ embeds: [embed] });
  });

  jobs.set(guildId, job);
}

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