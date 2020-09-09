const { Client } = require("espn-fantasy-football-api/node");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
let myClient;
let leagueId = 65246886;
let seasonId = 2020;

module.exports = {
	name: "fantasy",
	category: "fun",
	description: "Get stats for the 2020 Fantasy League",
	usage: "<team abbr | 'all' | 'list'>",
	run: async (client, message, args) => {
		myClient = new Client({
			leagueId,
			espnS2: process.env.ESPN_S2,
			SWID: process.env.SWID,
		});
		let teams = await myClient.getTeamsAtWeek({ seasonId, scoringPeriodId: 1 });
		let abbr_array = ["TUL", "DICK", "UAH", "BURN"];
		if (!args[0]) {
		} else if (args[0] == "list") {
			return message.channel.send(
				`${teams[0].name} (${teams[0].abbreviation})\n${teams[1].name} (${teams[1].abbreviation})\n${teams[2].name} (${teams[2].abbreviation})\n${teams[3].name} (${teams[3].abbreviation})`
			);
		} else if (args[0] == "all") {
			const embed = new MessageEmbed()
				.setColor("#0db14b")
				.setTitle("Charger Football League")
				.setFooter("Charger Football")
				.setTimestamp()
				.addField(
					"**East Division**",
					stripIndents`${teams[0].name} 
					**- Divisional Stats:** ${teams[0].divisionWins}-${teams[0].divisionLosses}-${teams[0].divisionTies}
					\n
					${teams[3].name}
					**- Divisional Stats:** ${teams[3].divisionWins}-${teams[3].divisionLosses}-${teams[3].divisionTies}`,
					true
				)
				.addField(
					"**West Division**",
					stripIndents`${teams[1].name} 
					**- Divisional Stats:** ${teams[1].divisionWins}-${teams[1].divisionLosses}-${teams[1].divisionTies}
					\n
					${teams[2].name}
					**- Divisional Stats:** ${teams[2].divisionWins}-${teams[2].divisionLosses}-${teams[2].divisionTies}`,
					true
				);
			return message.channel.send(embed);
		} else if (abbr_array.includes(args[0].toUpperCase())) {
			let index = abbr_array.indexOf(args[0].toUpperCase());
			const embed = new MessageEmbed()
				.setColor("#0db14b")
				.setTitle(
					`${teams[index].name} (${teams[index].wins}-${teams[index].losses}-${teams[index].ties})`
				)
				.setFooter("Charger Football")
				.setTimestamp()
				.addField(
					"Season Stats: ",
					stripIndents`**- Total Score:** ${teams[index].totalPointsScored}
				**- Win %:** ${teams[index].winningPercentage}%
				**- Rank:** ${teams[index].playoffSeed}`,
					true
				);
			return message.channel.send(embed);
		}
	},
};
