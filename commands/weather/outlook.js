var outlook_string_1,
	outlook_string_2,
	outlook_string_3 = require("wpoll.js");

module.exports = {
	name: "outlook",
	aliases: ["wp"],
	category: "weather",
	description: "Activate polling for weather alerts",
	run: async (client, message, args) => {
		if (!args.length) {
			message.channel.send("You did not provide an argument.");
		} else if (args.length > 1) {
			message.channel.send("Too many arguments.");
		} else if (args[0] === "1") {
			message.channel.send("", { files: [outlook_string_1] });
		} else if (args[0] === "2") {
			message.channel.send("", { files: [outlook_string_2] });
		} else if (args[0] === "3") {
			message.channel.send("", { files: [outlook_string_3] });
		} else {
			message.channel.send("Invalid parameter.");
		}
	},
};
