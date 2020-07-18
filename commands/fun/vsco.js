module.exports = {
  name: "vsco",
  category: "fun",
  description: "VSCO profile scraper",
  usage: "<username>",
  run: async (client, message, args) => {
    if (!args.length) {
      return message.channel.send("Please provide a username.");
    } else if (args.length > 1) {
      return message.channel.send("Too many arguments.");
    } else {
      // Execute Linux shell, print new photos
    }
  }
};
