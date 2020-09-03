const { PythonShell } = require("python-shell");
let pyshell = new PythonShell("/home/ubuntu/Discord-Stats-Bot/stocks.py");
module.exports = {
	name: "robin",
	category: "info",
	description: "Gives information about current stock market data",
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send("Please specify a function!");
		}
		if (!args[1]) {
			return message.channel.send("Please specify an entity!");
		}
		if (args[0].toLowerCase === "value" && args[1].toLowerCase() === "cam") {
			pyshell.send("crhowell3@gmail.com HOWELL_ROBIN");
		}
		await pyshell.stdout(async function (err, results) {
			if (err) throw err;
			return message.channel.send(results);
		});
	},
};
