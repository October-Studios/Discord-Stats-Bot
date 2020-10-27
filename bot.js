const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const { token } = require("./auth.json");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

let adapter = new FileSync('db.json');
let db = low(adapter);

const client = new Client({
	disableMentions: 'everyone',
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
