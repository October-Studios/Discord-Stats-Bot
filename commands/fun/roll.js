module.exports = {
	name: "roll",
	category: "fun",
	description: "Rolls an n-sided dice",
	usage: "<integer>",
	run: async (client, message, args) => {
		if (!args.length) {
			return message.channel.send("You did not provide an argument.");
		} else if (args.length > 1) {
			return message.channel.send("Too many arguments.");
		} else if (!parseInt(args[0]) && parseInt(args[0]) != 0) {
			return message.channel.send("You must use an integer value!");
		} else if (parseInt(args[0]) > Number.MAX_SAFE_INTEGER || parseInt(args[0]) < 1) {
			return message.channel.send(
				"Please use a value between 1 and 9007199254740991!)"
			);
		} else {
			return message.channel.send(Math.ceil(Math.random() * parseInt(args[0])));
		}
	},
};
