const {
  addMessage,
  editMessage,
  getMessage,
  getAllMessagesFromGuild,
  getAllGroupMessagesFromGuild,
  deleteMessage,
  updateMessageGroup,
  clearGroupFromMessages,
  getRandomMessageFromGuild
} = require('./databaseService');

// ======================================================
// SAFE PROMISE WRAPPER (NO REJECTIONS)
// ======================================================
function toPromise(fn, ...args) {
  return new Promise((resolve) => {
    fn(...args, (err, result) => {
      if (err) {
        console.error('DB ERROR:', err);
        return resolve(null); // NEVER reject → prevents interaction crash
      }

      resolve(result ?? []);
    });
  });
}

// ======================================================
// CREATE MESSAGE
// ======================================================
function addNewMessage(guildId, groupId, content) {
  return toPromise(addMessage, guildId, groupId, content);
}

// ======================================================
// EDIT MESSAGE
// ======================================================
function editExistingMessage(messageId, content) {
  return toPromise(editMessage, messageId, content);
}

// ======================================================
// GET SINGLE MESSAGE
// ======================================================
function getMessageById(messageId) {
  return toPromise(getMessage, messageId);
}

// ======================================================
// GET ALL MESSAGES (GUILD)
// ======================================================
function getAllMessagesForGuild(guildId) {
  return toPromise(getAllMessagesFromGuild, guildId);
}

// ======================================================
// GET ALL MESSAGES (GUILD + GROUP)
// ======================================================
function getAllMessagesForGuildAndGroup(guildId, groupId) {
  return toPromise(getAllGroupMessagesFromGuild, guildId, groupId);
}

// ======================================================
// DELETE MESSAGE
// ======================================================
function deleteExistingMessage(messageId) {
  return toPromise(deleteMessage, messageId);
}

// ======================================================
// UPDATE MESSAGE GROUP
// ======================================================
function updateMessageGroupService(messageId, groupId) {
  return toPromise(updateMessageGroup, messageId, groupId);
}

// ======================================================
// CLEAR GROUP REFERENCES
// ======================================================
function clearGroupFromMessagesService(guildId, groupId) {
  return toPromise(clearGroupFromMessages, guildId, groupId);
}

// ======================================================
// RANDOM MESSAGE (SAFE)
// ======================================================
function getRandomMessageFromGuildService(guildId, groupId = null) {
  return toPromise(getRandomMessageFromGuild, guildId, groupId);
}

// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  addNewMessage,
  editExistingMessage,
  getMessageById,
  getAllMessagesForGuild,
  getAllMessagesForGuildAndGroup,
  deleteExistingMessage,
  updateMessageGroup: updateMessageGroupService,
  clearGroupFromMessages: clearGroupFromMessagesService,
  getRandomMessageFromGuildService
};