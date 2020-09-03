const {PythonShell} = require("python-shell");

module.exports = {
	name: "robin",
	category: "info",
	description: "Gives information about current stock market data",
	run: async (client, message, args) => {
    PythonShell.run('/home/ubuntu/Discord-Stats-Bot/stocks.py', null, function (err, results) {
			if (err) throw err
			return message.channel.send(results)
    });
	},
};
