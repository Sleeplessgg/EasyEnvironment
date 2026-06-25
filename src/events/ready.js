module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Bot ready as ${client.user.tag}`);
  }
};