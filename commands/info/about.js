const { version, author, description, name } = require("../../package.json");

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
					name + "(django)" +
					"\nRelease Version: v" +
					version +
					"\nCreator: " +
					author +
					"\nDescription: " +
					description +
					"\nRelease notes v" +
					version +
					": Moved bot to NodeJS v15.0.1 and removed all shop commands due to dependence on out-of-date sqlite3 packages." +
					"\nTotal commands run: " + db.get('queried').value()

			);
		}
	},
};
