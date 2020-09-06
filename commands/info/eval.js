const { MessageEmbed } = require("discord.js");
const beautify = require("beautify");

module.exports = {
	name: "eval",
	aliases: ["e"],
	category: "info",
	description: "Evaluates the code you put in",
	usage: "<code>",
	run: async (client, message, args) => {
		if (message.author.id !== "396178060187271169") {
			return message.channel
				.send("You're not the owner of this bot.")
				.then((m) => m.delete({ timeout: 5000 }));
		}

		if (!args[0]) {
			return message.channel
				.send("Please enter something to be evaluated.")
				.then((m) => m.delete({ timeout: 5000 }));
		}

		try {
			if (args.join(" ").toLowerCase().includes("token")) {
				return;
			}

			const toEval = args.join(" ");
			const evaluated = eval(toEval);

			let embed = new MessageEmbed()
				.setColor("#00FF00")
				.setTimestamp()
				.setFooter(client.user.username, client.user.displayAvatarURL)
				.setTitle("Eval")
				.addField(
					"To evaluate:",
					`\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\n\`\`\``
				)
				.addField("Evaluated:", evaluated)
				.addField("Type of:", typeof evaluated);

			message.channel.send(embed);
		} catch (e) {
			let embed = new MessageEmbed()
				.setColor("#FF0000")
				.setTitle(":x: Error!")
				.setDescription(e)
				.setFooter(client.user.username, client.user.displayAvatarURL);

			message.channel.send(embed);
		}
	},
};
