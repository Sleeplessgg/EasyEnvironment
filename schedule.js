const cron = require('node-cron');
const { randomEmbed } = require('./messages');
const { loadData, saveData } = require('./storage');

const jobs = new Map();

function setSchedule(guildId, channel, hour, minute, enabled = true) {
  const data = loadData();

  // 💾 SAVE TO FILE
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
  global.client = client;

  const data = loadData();

  for (const guildId in data.guilds) {
    const s = data.guilds[guildId];

    if (!s.enabled) continue;

    const channel = client.channels.cache.get(s.channelId);
    if (!channel) continue;

    startJob(guildId, channel, s.hour, s.minute);
  }

  console.log("Schedules restored:", Object.keys(data.guilds).length);
}

module.exports = {
  setSchedule,
  initSchedules
};