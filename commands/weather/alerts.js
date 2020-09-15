var alerts = require("wpoll.js");

module.exports = {
	name: "alerts",
	aliases: ["al"],
	category: "weather",
	description: "Get the current alerts for Lincoln County, TN",
	run: (client, message) => {
		if (message.channel.id === "690767163178483733" && alerts.length != 0) {
			for (let i = 0; i < alerts.length; i++) {
				if (alerts[i].type.includes("Flood")) {
					message.channel.send(
						"```bash\n" +
							'"' +
							alerts[i].type +
							" for " +
							alerts[i].location +
							"\n" +
							alerts[i].headline +
							"\n" +
							alerts[i].description +
							'"\n' +
							" ```"
					);
				} else if (alerts[i].type.includes("Tornado Watch")) {
					message.channel.send(
						"```css\n" +
							"[" +
							alerts[i].type +
							" for " +
							alerts[i].location +
							"]\n[" +
							alerts[i].headline +
							"]\n[" +
							alerts[i].description +
							"]\n" +
							" ```"
					);
				} else if (alerts[i].type.includes("Tornado Warning")) {
					message.channel.send(
						"```diff\n" +
							"-" +
							alerts[i].type +
							" for " +
							alerts[i].location +
							"\n-" +
							alerts[i].headline +
							"\n" +
							alerts[i].description +
							"\n" +
							" ```"
					);
				} else if (alerts[i].type.includes("Severe Thunderstorm")) {
					message.channel.send(
						"```fix\n" +
							alerts[i].type +
							" for " +
							alerts[i].location +
							"\n" +
							alerts[i].headline +
							"\n" +
							alerts[i].description +
							"\n" +
							" ```"
					);
				} else {
					message.channel.send(
						"```\n" +
							alerts[i].type +
							" for " +
							alerts[i].location +
							"\n" +
							alerts[i].headline +
							"\n" +
							alerts[i].description +
							"\n" +
							" ```"
					);
				}
			}
		} else {
			message.channel.send("No active alerts for Lincoln County");
		}
	},
};
