const { version, author, description, name } = require("../../package.json");
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('db.json');
const db = low(adapter);

module.exports = {
	name: "about",
	aliases: ["a"],
	category: "info",
	description: "Provides information about me!",
	run: async (client, message) => {
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
				"\nTotal commands run: " + await db.get('queried').value()

		);
	},
};
