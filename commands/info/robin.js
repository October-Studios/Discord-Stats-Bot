const { PythonShell } = require("python-shell");
var options = {
	scriptPath: '/home/ubuntu/Discord-Stats-Bot'
};

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
		if (args[0].toLowerCase() === "value" && args[1].toLowerCase() === "cam") {
			var pyshell = new PythonShell("stocks.py", options, { mode: 'text' });
			pyshell.send("crhowell3@gmail.com HOWELL_ROBIN")
			pyshell.stdout.on('data', function(data) {
				message.channel.send(data)
			});
			pyshell.end(function(err) {
				if (err) throw err;
				console.log("End Script")
			});
		}
	},
};
