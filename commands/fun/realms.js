const shell = require("shelljs");
const { MessageEmbed } = require("discord.js");

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
					var spl = req.split(" ");
					const embed = new MessageEmbed()
						.setColor("#14BEBC")
						.setTitle("Minecraft Realms Info")
						.addField("Server Name: ", `${spl[2]}`, true)
						.addField("Owner: ", `${spl[0]}`, true);
					message.channel.send(embed);
					break;
				default:
					break;
			}
		}
	},
};
