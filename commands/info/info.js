const { version, author, description, name } = require("../../package.json");

module.exports = {
	name: "info",
	aliases: "i",
	category: "info",
	description: "Provides information about me!",
	run: async (message) => {
		message.channel.send(
			"Bot name: " +
				name +
				"\nBot version: " +
				version +
				"\nAuthor: " +
				author +
				"\nDescription" +
				description +
				"\n Patch notes for v" +
				version +
				": reformatted command code and removed unused variables."
		);
	},
};
