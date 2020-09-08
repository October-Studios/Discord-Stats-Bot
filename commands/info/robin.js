const { PythonShell } = require("python-shell");
var options = {
	scriptPath: "/home/ubuntu/Discord-Stats-Bot",
};
var username = "crhowell3@gmail.com";
var password = "HOWELL_ROBIN";

module.exports = {
	name: "robin",
	category: "info",
	description: "Gives information about current stock market data",
	usage: "<symbol>",
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send("Please specify a function!");
		}
		var pyshell = new PythonShell("stocks.py", options, { mode: "text" });
		pyshell.send(username + " " + password + " " + args[0]);
		pyshell.stdout.on("data", function (data) {
			message.channel.send(data);
		});
		pyshell.end(function (err) {
			if (err) throw err;
		});
	},
};
