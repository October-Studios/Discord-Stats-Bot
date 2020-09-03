const { PythonShell } = require("python-shell");
var options = {
	scriptPath: "/home/ubuntu/Discord-Stats-Bot",
};
var username = "";
var password = "";

module.exports = {
	name: "robin",
	category: "info",
	description: "Gives information about current stock market data",
	usage: "<value | stock> <user | stock_name>",
	run: async (client, message, args) => {
		if (!args[0]) {
			return message.channel.send("Please specify a function!");
		}
		if (!args[1]) {
			return message.channel.send("Please specify an entity!");
		}
		if (args[0].toLowerCase() === "value") {
			if (args[1].toLowerCase() === "cam") {
				username = "crhowell3@gmail.com";
				password = "HOWELL_ROBIN";
			} else if (args[1].toLowerCase() === "luke") {
				username = "lukemcalister14@gmail.com";
				password = "MCALISTER_ROBIN";
			} else return message.channel.send("Invalid person!");
			var pyshell = new PythonShell("stocks.py", options, { mode: "text" });
			pyshell.send(username + " " + password);
			pyshell.stdout.on("data", function (data) {
				message.channel.send(data);
			});
			pyshell.end(function (err) {
				if (err) throw err;
			});
		}
	},
};
