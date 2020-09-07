const currency = require("../../bot.js");

module.exports = {
	name: "transfer",
	aliases: ["tr"],
	category: "shop",
	description: "Transfer currency between accounts",
	usage: "<receiver> <amount>",
	run: (client, message, args) => {
		const currentAmount = currency.getBalance(message.author.id);
		const transferAmount = args[1];
		const transferTarget = message.mentions.users.first();

    if (!args.length) {
			return message.channel.send("You did not provide an argument.");
    } else if (args.length > 2) {
			return message.channel.send("Too many arguments!");
    } else if (!parseInt(args[1])) {
			return message.channel.send("Please provide an integer value to transfer!");
    }

		if (!transferAmount || isNaN(transferAmount))
			return message.channel.send(
				`Sorry ${message.author}, that's an invalid amount.`
			);
		if (transferAmount > currentAmount)
			return message.channel.send(
				`Sorry ${message.author}, you only have ${currentAmount}.`
			);
		if (transferAmount <= 0)
			return message.channel.send(
				`Please enter an amount greater than zero, ${message.author}.`
			);
		currency.add(message.author.id, -transferAmount);
		currency.add(transferTarget.id, transferAmount);

		return message.channel.send(
			`Successfully transferred ${transferAmount} to ${
				transferTarget.tag
			}. Your current balance is ${currency.getBalance(message.author.id)}`
		);
	},
};
