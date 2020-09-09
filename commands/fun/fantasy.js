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
	usage: "<integer>",
	run: async (client, message, args) => {
		myClient = new Client({
			leagueId,
			espnS2: process.env.ESPN_S2,
			SWID: process.env.SWID,
		});
		let teams = await myClient.getTeamsAtWeek({ seasonId, scoringPeriodId: 1 });
		const embed = new MessageEmbed()
			.setColor("#0db14b")
			.setThumbnail(`${teams[0].logoURL}`)
			.setTitle(
				`${teams[0].name} (${teams[0].wins}-${teams[0].losses}-${teams[0].ties})`
			)
			.setFooter("Charger Football")
			.setTimestamp()
			.addField(
				"Season Stats: ",
				stripIndents`**- Total Score:** ${teams[0].totalPointsScored}
				**- Win %:** ${teams[0].winningPercentage}%
				**- Rank:** ${teams[0].playoffSeed}`,
				true
			);
		return message.channel.send(embed);
	},
};
