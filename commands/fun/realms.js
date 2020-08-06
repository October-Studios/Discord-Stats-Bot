const shell = require("shelljs");

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
		} else {
			switch (args[0]) {
				case "info":
					var req = shell.exec(
						"bash ~/Discord-Stats-Bot/realms-request/get-world.sh",
						{ silent: true }
					).stdout;
					message.channel.send(req);
					break;
				default:
					break;
			}
		}
	},
};
