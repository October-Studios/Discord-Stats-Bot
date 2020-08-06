const axios = require("axios");
let auth_server = "https://authserver.mojang.com";
let user = "crhowell3@gmail.com";
let pass = "Tuaman13!";
let client_token = "kobeisabitch";
let realms_server = "https://pc.realms.minecraft.net";
let uuid = "9f5b28502c67451b9ab20329791bbc60";
let user_id = "Orionium";
let version = "1.16.1";
var access_token;

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
							access_token = response.data.accessToken;
						});
					let cookie_value =
						"sid_token=" +
						access_token +
						":" +
						uuid +
						";user=" +
						user_id +
						";version=" +
						version;
					axios
						.get(realms_server + "/activities/liveplayerlist", {
							headers: { Cookie: cookie_value },
						})
						.then((response) => {
							console.log(response);
						});
					break;
				case "world":
					axios
						.post(auth_server + "/authenticate", {
							username: user,
							password: pass,
							clientToken: client_token,
							agent: '{"name": "Minecraft","version": 1}',
						})
						.then(function (response) {
							access_token = response.data.accessToken;
						});
					axios.get(realms_server + "/worlds/1").then((response) => {
						console.log(response);
					});
					break;
				default:
					break;
			}
		}
	},
};
