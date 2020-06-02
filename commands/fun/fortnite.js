const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

const Client = require('fortnite');
const ft = new Client(process.env.FORTNITE); 

module.exports = {
	name: "fortnite",
	aliases: ["ft"],
	category: "fun",
	description: "Display someone's stats or the current store!",
	usage: "<username | store>",
	run: async (client, message, args) => {
		const platforms = ["pc", "xbl", "psn"];
		
		if (args[0].toLowerCase() === "store") {
			const store = await ft.store();

			const embed = new MessageEmbed()
				.setColor("#9d4dbb")
				.setFooter("Fortnite Store", message.author.displayAvatarURL)
				.setTimestamp();

			store.sort((a, b) => {
				return b.vbucks - a.vbucks;
			});

			store.forEach(el => {
				embed.addField(el.name, stripIndents`**- Rarity:** ${el.rarity}
				**- Price:** ${el.vbucks} V-Bucks
				**- Image:** [Press Me](${el.image})`, true)
			});
			
			message.channel.send(embed);
		} else {
			const lastWord = args[args.length - 1].toLowerCase();

			let platform, username;

			if(platforms.includes(lastWord)){
				username = args.slice(0, args.length - 1).join(" ");
				platform = lastWord;
			} else {
				username = args.join(" ");
				platform = "pc";
			}

			const search = await ft.user(username, platform);

			if (!search.username) {
				return message.channel.send("Could not find that user!")
					.then(m => m.delete(5000));
			}

			const lifetime = search.stats.lifetime;
			const solo = search.stats.solo;
			const duo = search.stats.duo;
			const squad = search.stats.squad;

			const embed = new MessageEmbed()
				.setColor("#9d4dbb")
				.setTitle(`${search.username} (${search.platform})`)
				.setFooter("Fortnite stats", message.author.displayAvatarURL)
				.setTimestamp()
				.addField("Solo: ", stripIndents`**- Wins:** ${solo.wins}
				**- KD:** ${solo.kd}
				**- Kills:** ${solo.kills}
				**- Kills per match:** ${solo.kills_per_match}`, true)
				.addField("Duo: ", stripIndents`**- Wins:** ${duo.wins}
		    **- KD:** ${duo.kd}
	 	    **- Kills:** ${duo.kills}
	 	    **- Kills per match:** ${duo.kills_per_match}`, true)
				.addField("Squad: ", stripIndents`**- Wins:** ${squad.wins}
	      **- KD:** ${squad.kd}
	      **- Kills:** ${squad.kills}
	      **- Kills per match:** ${squad.kills_per_match}`, true)
				.addField("Lifetime: ", stripIndents`**- Wins:** ${lifetime.wins}
				**- KD:** ${lifetime.kd}
				**- Kills:** ${lifetime.kills}`, false);

			message.channel.send(embed);
		}
	}
}
