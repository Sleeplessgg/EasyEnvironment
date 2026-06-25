const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(
  path.join(__dirname, '../data/database.sqlite')
);

// ======================================================
// INIT TABLES (V2 CLEAN)
// ======================================================
db.serialize(() => {

  // ---------------- MESSAGES ----------------
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      messageId INTEGER PRIMARY KEY AUTOINCREMENT,
      guildId TEXT NOT NULL,
      groupId INTEGER NOT NULL DEFAULT 0,
      content TEXT NOT NULL
    )
  `);

  // ---------------- GROUPS ----------------
  db.run(`
    CREATE TABLE IF NOT EXISTS groups (
      groupId INTEGER PRIMARY KEY AUTOINCREMENT,
      guildId TEXT NOT NULL,
      name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS groupSchedules (
      guildId TEXT PRIMARY KEY,
      intervalDays INTEGER NOT NULL,
      startDate TEXT NOT NULL,
      enabled INTEGER NOT NULL DEFAULT 0,
      activeGroupId INTEGER DEFAULT 0
    )
  `);

});

// ======================================================
// MESSAGES
// ======================================================

// CREATE MESSAGE
function addMessage(guildId, groupId, content, callback) {
  db.run(
    `
    INSERT INTO messages (guildId, groupId, content)
    VALUES (?, ?, ?)
    `,
    [guildId, groupId ?? 0, content],
    callback
  );
}

// EDIT MESSAGE
function editMessage(messageId, content, callback) {
  db.run(
    `
    UPDATE messages
    SET content = ?
    WHERE messageId = ?
    `,
    [content, messageId],
    callback
  );
}

// GET ONE MESSAGE
function getMessage(messageId, callback) {
  db.get(
    `
    SELECT * FROM messages
    WHERE messageId = ?
    `,
    [messageId],
    callback
  );
}

// GET ALL MESSAGES FROM GUILD
function getAllMessagesFromGuild(guildId, callback) {
  db.all(
    `
    SELECT *
    FROM messages
    WHERE guildId = ?
    ORDER BY messageId ASC
    `,
    [guildId],
    callback
  );
}

// GET MESSAGES BY GROUP
function getAllGroupMessagesFromGuild(guildId, groupId, callback) {
  db.all(
    `
    SELECT *
    FROM messages
    WHERE guildId = ?
      AND groupId = ?
    ORDER BY messageId ASC
    `,
    [guildId, groupId],
    callback
  );
}

// DELETE MESSAGE
function deleteMessage(messageId, callback) {
  db.run(
    `
    DELETE FROM messages
    WHERE messageId = ?
    `,
    [messageId],
    callback
  );
}

// UPDATE MESSAGE GROUP
function updateMessageGroup(messageId, groupId, callback) {
  db.run(
    `
    UPDATE messages
    SET groupId = ?
    WHERE messageId = ?
    `,
    [groupId, messageId],
    callback
  );
}

// CLEAR GROUP FROM MESSAGES (when deleting group)
function clearGroupFromMessages(guildId, groupId, callback) {
  db.run(
    `
    UPDATE messages
    SET groupId = 0
    WHERE guildId = ?
      AND groupId = ?
    `,
    [guildId, groupId],
    callback
  );
}

// ======================================================
// GROUPS
// ======================================================

// CREATE GROUP
function addGroup(guildId, name, callback) {
  db.run(
    `
    INSERT INTO groups (guildId, name)
    VALUES (?, ?)
    `,
    [guildId, name],
    callback
  );
}

// GET GROUPS BY GUILD
function getGroupsByGuild(guildId, callback) {
  db.all(
    `
    SELECT *
    FROM groups
    WHERE guildId = ?
    ORDER BY groupId ASC
    `,
    [guildId],
    callback
  );
}

// GET SINGLE GROUP
function getGroup(guildId, groupId, callback) {
  db.get(
    `
    SELECT *
    FROM groups
    WHERE guildId = ?
      AND groupId = ?
    `,
    [guildId, groupId],
    callback
  );
}

// DELETE GROUP
function deleteGroup(groupId, guildId, callback) {
  db.run(
    `
    DELETE FROM groups
    WHERE groupId = ?
      AND guildId = ?
    `,
    [groupId, guildId],
    callback
  );
}

// EDIT GROUP NAME
function editGroupName(groupId, guildId, name, callback) {
  db.run(
    `
    UPDATE groups
    SET name = ?
    WHERE groupId = ?
      AND guildId = ?
    `,
    [name, groupId, guildId],
    callback
  );
}


//EXPORT RANDOM MESSAGE FOR SENDING IT IN CHANNEL
function getRandomMessageFromGuild(guildId, groupId, callback) {
  let query = `
    SELECT *
    FROM messages
    WHERE guildId = ?
  `;

  const params = [guildId];

  if (groupId !== null && groupId !== undefined) {
    query += ` AND groupId = ?`;
    params.push(groupId);
  }

  query += ` ORDER BY RANDOM() LIMIT 1`;

  db.get(query, params, callback);
}


// ======================================================
// INTERVALS
// ======================================================
function setGroupSchedule(guildId, intervalDays, startDate, enabled, callback) {
  db.run(
    `
    INSERT INTO groupSchedules (guildId, intervalDays, startDate, enabled, activeGroupId)
    VALUES (?, ?, ?, ?, 0)
    ON CONFLICT(guildId)
    DO UPDATE SET
      intervalDays = excluded.intervalDays,
      startDate = excluded.startDate,
      enabled = excluded.enabled
    `,
    [guildId, intervalDays, startDate, enabled ? 1 : 0],
    callback
  );
}

function getGroupSchedule(guildId, callback) {
  db.get(
    `SELECT * FROM groupSchedules WHERE guildId = ?`,
    [guildId],
    callback
  );
}

function updateActiveGroup(guildId, groupId, callback) {
  db.run(
    `
    UPDATE groupSchedules
    SET activeGroupId = ?
    WHERE guildId = ?
    `,
    [groupId, guildId],
    callback
  );
}

// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  // messages
  addMessage,
  editMessage,
  getMessage,
  getAllMessagesFromGuild,
  getAllGroupMessagesFromGuild,
  deleteMessage,
  updateMessageGroup,
  clearGroupFromMessages,
  getRandomMessageFromGuild,

  // groups
  addGroup,
  getGroupsByGuild,
  getGroup,
  deleteGroup,
  editGroupName,

  //INTERVALS
   setGroupSchedule,
  getGroupSchedule,
  updateActiveGroup
};