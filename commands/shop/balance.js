const currency = require("../../bot.js");

module.exports = {
	name: "balance",
	aliases: ["bal"],
	category: "shop",
	description: "Display a user's balance",
	usage: "[user]",
	run: (client, message) => {
		const target = message.mentions.users.first() || message.author;
		return message.channel.send(
			`${target.tag} has` + " ₸" + `${currency.getBalance(target.id)}`
		);
	},
};
