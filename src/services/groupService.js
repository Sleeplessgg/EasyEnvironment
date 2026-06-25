const {
  addGroup,
  getGroupsByGuild,
  deleteGroup,
  getGroup
} = require('./databaseService');

function toPromise(fn, ...args) {
  return new Promise((resolve) => {
    fn(...args, (err, result) => {
      if (err) {
        console.error('DB ERROR:', err);
        return resolve(null); // NEVER reject -> prevents interaction crash
      }

      resolve(result ?? []);
    });
  });
}

async function createGroup(guildId, name) {
  return toPromise(addGroup, guildId, name);
}

async function getGuildGroups(guildId) {
  return toPromise(getGroupsByGuild, guildId);
}

async function getGroupById(guildId, groupId) {
  return toPromise(getGroup, guildId, groupId);
}

async function removeGroup(groupId, guildId) {
  return toPromise(deleteGroup, groupId, guildId);
}

module.exports = {
  createGroup,
  getGuildGroups,
  getGroupById,
  removeGroup
};