const { Client } = require("espn-fantasy-football-api/node");
let myClient;
let leagueId = 65246886;
let seasonId = 2020;

module.exports = {
	name: "fantasy",
	category: "fun",
	description: "Get stats for the 2020 Fantasy League",
	usage: "<integer>",
	run: async (client, message, args) => {
		myClient = new Client({
			leagueId,
			espnS2: process.env.ESPN_S2,
			SWID: process.env.SWID,
		});
		let test = await myClient.getTeamsAtWeek({ seasonId, scoringPeriodId: 1 });
		let n = test[0].name;
		return message.channel.send(n);
	},
};
