const { getCurrentSetIndex} = require("./seasonChoose");


const seasonList = [[
  {
    title: "Hello SPRING👋",
    description: "Hope you're having a great day!",
    color: 0x00ffcc,
    thumbnail: {
        url: "https://i.imgur.com/ppfknND.jpeg"
    }
  },
  {
    title: "How are you? SPRING",
    description: "Don't forget to take a break 💡",
    color: 0xffcc00,
    thumbnail: {
        url: "https://i.imgur.com/ppfknND.jpeg"
    }
  }, 
  {
    title: "Daily Reminder 💡 SPRING",
    description: "Stay focused and keep going!",
    color: 0x5865f2,
    thumbnail: {
        url: "https://i.imgur.com/ppfknND.jpeg"
    }
  }
],[{
    title: "Hello 👋 SUMMER",
    description: "Hope you're having a great day!",
    color: 0x00ffcc,
    thumbnail: {
        url: "https://i.imgur.com/ppfknND.jpeg"
    }
  },
  {
    title: "How are you?SUMMER",
    description: "Don't forget to take a break 💡",
    color: 0xffcc00,
    thumbnail: {
        url: "https://i.imgur.com/ppfknND.jpeg"
    }
  }, 
  {
    title: "Daily Reminder 💡SUMMER",
    description: "Stay focused and keep going!",
    color: 0x5865f2,
    thumbnail: {
        url: "https://i.imgur.com/ppfknND.jpeg"
    }
  }], [{
    title: "Hello 👋AUTUMN",
    description: "Hope you're having a great day!",
    color: 0x00ffcc,
    thumbnail: {
        url: "https://i.imgur.com/ppfknND.jpeg"
    }
  },
  {
    title: "How are you?AUTUMN",
    description: "Don't forget to take a break 💡",
    color: 0xffcc00,
    thumbnail: {
        url: "https://i.imgur.com/ppfknND.jpeg"
    }
  }, 
  {
    title: "Daily Reminder 💡AUTUMN",
    description: "Stay focused and keep going!",
    color: 0x5865f2,
    thumbnail: {
        url: "https://i.imgur.com/ppfknND.jpeg"
    }
  }], [{
    title: "Hello 👋WINTER",
    description: "Hope you're having a great day!",
    color: 0x00ffcc,
    thumbnail: {
        url: "https://i.imgur.com/ppfknND.jpeg"
    }
  },
  {
    title: "How are you?WINTER",
    description: "Don't forget to take a break 💡",
    color: 0xffcc00,
    thumbnail: {
        url: "https://i.imgur.com/ppfknND.jpeg"
    }
  }, 
  {
    title: "Daily Reminder 💡WINTER",
    description: "Stay focused and keep going!",
    color: 0x5865f2,
    thumbnail: {
        url: "https://i.imgur.com/ppfknND.jpeg"
    }
  }]];

module.exports = {
  randomEmbed: () => seasonList[getCurrentSetIndex()][Math.floor(Math.random() * seasonList[getCurrentSetIndex()].length)]
};