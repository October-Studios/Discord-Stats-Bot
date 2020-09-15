var outlook_string_1,
	outlook_string_2,
	outlook_string_3 = require("./wpoll.js");

module.exports = {
	name: "outlook",
	aliases: ["wp"],
	category: "weather",
	description: "Activate polling for weather alerts",
	run: async (client, message, args) => {
		if (message.channel.id === "690767163178483733") {
			if (!args.length) {
				return message.channel.send("You did not provide an argument.");
			} else if (args.length > 1) {
				return message.channel.send("Too many arguments.");
			} else if (args[0] === "1") {
				return message.channel.send("", { files: [outlook_string_1] });
			} else if (args[0] === "2") {
				return message.channel.send("", { files: [outlook_string_2] });
			} else if (args[0] === "3") {
				return message.channel.send("", { files: [outlook_string_3] });
			} else {
				return message.channel.send("Invalid parameter.");
			}
		}
	},
};
