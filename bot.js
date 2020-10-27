const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const { Users } = require("./dbObjects");
const currency = new Collection();
const { token } = require("./auth.json");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

let cooldown = new Set();
let cdSeconds = 60;

module.exports = {
	currency,
	db
};

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
			name: "with my pp",
			type: "PLAYING",
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
		let total = db.get('queried').value();
		total++;
		db.set('queried', total).write();
	}
});

client.login(token);
