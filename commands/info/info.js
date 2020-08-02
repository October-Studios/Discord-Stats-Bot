const { version, author, description, name } = require("../../package.json");

module.exports = {
	name: "info",
	aliases: "i",
	category: "info",
	description: "Provides information about me!",
	run: async (client, message) => {
		return message.channel.send(
			"Bot name: " +
				name +
				"\nBot version: " +
				version +
				"\nAuthor: " +
				author +
				"\nDescription: " +
				description +
				"\nPatch notes for v" +
				version +
				": reformatted command code and removed unused variables. Fixed formatting errors for this command."
		);
	},
};
