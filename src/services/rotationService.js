const cron = require('node-cron');
const { loadData, saveData } = require('../utils/storage');

// ======================================================
// SET GROUP ROTATION CONFIG
// ======================================================
function setGroupSchedule(guildId, intervalDays, startDate, enabled = true) {
  const data = loadData();

  data.groupSchedules = data.groupSchedules || {};

  data.groupSchedules[guildId] = {
    intervalDays: Number(intervalDays),
    startDate: new Date(startDate).getTime(),
    enabled,
    activeGroup: 0
  };

  saveData(data);
}

// ======================================================
// GET CONFIG
// ======================================================
function getGroupSchedule(guildId) {
  const data = loadData();
  return data.groupSchedules?.[guildId] || null;
}

// ======================================================
// ROTATION JOB (RUNS DAILY)
// ======================================================
function startRotationJob() {

  cron.schedule('0 * * * *', () => { // every hour check
    const data = loadData();

    if (!data.groupSchedules) return;

    for (const guildId in data.groupSchedules) {
      const s = data.groupSchedules[guildId];

      if (!s.enabled) continue;

      const now = Date.now();
      const diffDays = Math.floor(
        (now - s.startDate) / (1000 * 60 * 60 * 24)
      );

      if (s.intervalDays > 0 && diffDays >= 0) {
        const cycles = Math.floor(diffDays / s.intervalDays);

        s.activeGroup = cycles;
      }
    }

    saveData(data);
  });
}

module.exports = {
  setGroupSchedule,
  getGroupSchedule,
  startRotationJob
};