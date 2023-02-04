const { Client, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config()
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach((handler) => {
	require(`./handler/${handler}`)(client);
});

client.on("ready", async () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({
		activity: {
			name: "Minecraft on 50.81.219.52:25565",
			type: "PLAYING",
		},
		status: "online",
	});
});

client.on("interactionCreate", async interaction => {
	//const prefix = "//";
	//if (message.author.bot) return;
	//if (!message.content.startsWith(prefix)) return;
	//const args = message.content.slice(prefix.length).split(" ");
	//const command = args.shift().toLowerCase();
	//if (command.length === 0) return;
	//let cmd = client.commands.get(command);
	//if (!cmd) cmd = client.commands.get(client.aliases.get(command));

	//if (cmd) {
	//	cmd.run(client, message, args);
	//	let total = db.get('queried').value();
	//	total++;
	//	db.set('queried', total).write();
	//}
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.TOKEN);
