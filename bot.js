const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const { Users, CurrencyShop } = require("./dbObjects");
const { Op } = require("sequelize");
const currency = new Collection();
const { token } = require("./auth.json");
let cooldown = new Set();
let cdSeconds = 60;

module.exports = currency;

Reflect.defineProperty(currency, "add", {
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, "getBalance", {
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

const client = new Client({
	disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

config({
	path: __dirname + "/.env",
});

["command"].forEach((handler) => {
	require(`./handler/${handler}`)(client);
});

client.on("ready", async () => {
	const storedBalances = await Users.findAll();
	storedBalances.forEach((b) => currency.set(b.user_id, b));
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({
		activity: {
			name: "you",
			type: "WATCHING",
		},
		status: "online",
	});
});

client.on("message", async (message) => {
	const prefix = "//";
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) {
		if (!cooldown.has(message.author.id)) {
			currency.add(message.author.id, 1);
			cooldown.add(message.author.id);
			setTimeout(() => {
				cooldown.delete(message.author.id);
			}, cdSeconds * 1000);
		}
		return;
	}
	const args = message.content.slice(prefix.length).split(" ");
	const command = args.shift().toLowerCase();
	if (command.length === 0) return;
	let cmd = client.commands.get(command);
	if (!cmd) cmd = client.commands.get(client.aliases.get(command));

	if (cmd) {
		cmd.run(client, message, args);
	}

	if (command === "inventory") {
		const target = message.mentions.users.first() || message.author;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		if (!items.length)
			return message.channel.send(`${target.tag} has nothing!`);
		return message.channel.send(
			`${target.tag} currently has ${items
				.map((i) => `${i.amount} ${i.item.name}`)
				.join(", ")}`
		);
	} else if (command === "transfer") {
		const currentAmount = currency.getBalance(message.author.id);
		const transferAmount =
			commandArgs.split(/ +/g) / find((arg) => !/<@!?\d+>/g.test(arg));
		const transferTarget = message.mentions.users.first();

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
	} else if (command === "buy") {
		const item = await CurrencyShop.findOne({
			where: { name: { [Op.like]: args[0] } },
		});
		if (!item) return message.channel.send(`That item doesn't exist.`);
		if (item.cost > currency.getBalance(message.author.id)) {
			return message.channel.send(
				`You currently have ${currency.getBalance(
					message.author.id
				)}, but the ${item.name} costs ${item.cost}!`
			);
		}

		const user = await Users.findOne({ where: { user_id: message.author.id } });
		currency.add(message.author.id, -item.cost);
		await user.addItem(item);

		message.channel.send(`You've bought: ${item.name}.`);
	} else if (command === "sell") {
		const user = await Users.findOne({ where: { user_id: message.author.id } });
		const items = await user.getItems();
		const item = await CurrencyShop.findOne({
			where: { name: { [Op.like]: args[0] } },
		});
		if (!item) return message.channel.send(`That item doesn't exist.`);
		if (!items.map((i) => i.item.name).includes(item.name) || !items.length)
			return message.channel.send(
				`You can't sell that item because you don't own it!`
			);
		if (
			items.map((i) => i.item.name).includes(item.name) &&
			item.sellable === true
		) {
			if (!args[1] && items.map((i) => i.amount)[0] > 0) {
				currency.add(message.author.id, item.sellPrice);
				await user.removeItem(item);
			} else {
				if (args[1] <= items.map((i) => i.amount)[0] && args[1] > 0) {
					currency.add(message.author.id, item.sellPrice * args[1]);
					for (var i = 0; i < items.map((i) => i.amount)[0]; i++) {
						await user.removeItem(item);
					}
				} else {
					return message.channel.send("You do not have that many!");
				}
			}
		} else {
			return message.channel.send("That item is not sellable.");
		}
		message.channel.send(`You've sold ${item.name} for ${item.sellPrice}.`);
	} /*else if (command === "leaderboard") {
		return message.channel.send(
			currency
				.sort((a, b) => b.balance - a.balance)
				.filter((user) => client.users.cache.has(user.user_id))
				.first(10)
				.map(
					(user, position) =>
						`${position + 1} ${client.users.cache.get(user.user_id).tag}: ${
							user.balance
						}`
				)
				.join("\n"),
			{ code: true }
		);
	}*/
});

client.login(token);
