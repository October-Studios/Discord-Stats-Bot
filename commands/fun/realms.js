const { exec } = require("child_process");

module.exports = {
	name: "realms",
	aliases: ["r"],
	category: "fun",
	description: "Gives details about The Homies realm.",
	usage: "<stat>",
	run: async (client, message, args) => {
		if (!args.length) {
			return message.channel.send("You did not provide an argument.");
		} else if (args.length > 1) {
			return message.channel.send("Too many arguments.");
		} else if (args[0] == "help") {
			return message.channel.send("List of stats:\nall\nactivePlayers\nup");
		} else {
			switch (args[0]) {
				case "all":
					exec("source ../../mcr.sh", (error, stdout, stderr) => {
						message.channel.send(`stdout: ${stdout}`);
					});
					break;
				default:
					break;
			}
		}
	},
};
