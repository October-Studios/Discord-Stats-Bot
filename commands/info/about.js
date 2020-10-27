const { version, author, description, name } = require("../../package.json");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

module.exports = {
	name: "about",
	aliases: ["a"],
	category: "info",
	description: "Provides information about me!",
	usage: "[total | name | version]",
	run: async (client, message, args) => {
		let adapter = new FileSync('db.json');
		let db = low(adapter);
		if (args[0] === "total") {
			return message.channel.send("Total commands run: " + db.get('queried').value());
		} else if (args[0] === "name") {
			return message.channel.send("Bot name: " + name + "(カーリー)");
		}  else if (args[0] === "version") {
			return message.channel.send("Release Version: v" + version);
		} else if (!args[0]) {
			return message.channel.send(
				"Bot name: " +
					name + "(カーリー)" +
					"\nRelease Version: v" +
					version +
					"\nCreator: " +
					author +
					"\nDescription: " +
					description +
					"\nRelease notes v" +
					version +
					": Moved all bot commands to new format with command handler and modular structure" +
					"\nTotal commands run: " + db.get('queried').value()

			);
		}
	},
};
