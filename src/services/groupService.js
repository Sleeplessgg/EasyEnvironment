const {
  addGroup,
  getGroupsByGuild,
  deleteGroup,
  getGroup
} = require('./databaseService');

function toPromise(fn, ...args) {
  return new Promise((resolve, reject) => {
    fn(...args, (err, result) => {
      if (err) return reject(err);
      resolve(result);
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