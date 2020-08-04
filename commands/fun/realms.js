const axios = require("axios");
let auth_server = "https://authserver.mojang.com";
let user = "crhowell3@gmail.com";
let pass = "Tuaman13!";
let client_token = "kobeisabitch";

module.exports = {
	name: "realms",
	aliases: ["r"],
	category: "fun",
	description: "Gives details about The Homies realm.",
	usage: "<stat>",
	run: async (client, message, args) => {
		if (!args.length) {
			return message.channel.send("You did not provide an argument.");
		} else if (args.length > 1) {
			return message.channel.send("Too many arguments.");
		} else if (args[0] == "help") {
			return message.channel.send("List of stats:\nall\nactivePlayers\nup");
		} else {
			switch (args[0]) {
				case "all":
					axios
						.post(auth_server + "/authenticate", {
							username: user,
							password: pass,
							clientToken: client_token,
							agent: '{"name": "Minecraft","version": 1}',
						})
						.then(function (response) {
							let access_token = response;
							message.channel.send(access_token);
						});
					break;
				default:
					break;
			}
		}
	},
};
