const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

export const name = "whois";
export const aliases = ["who", "user", "info"];
export const category = "info";
export const description = "Returns user information";
export const usage = "[username | id | mention]";
export function run(client, message, args) {
	const member = getMember(message, args.join(" "));

	const joined = formatDate(member.joinedAt);
	const roles =
		member.roles.cache
			.filter((r) => r.id !== message.guild.id)
			.map((r) => r)
			.join(", ") || "none";

	const created = formatDate(member.user.createdAt);

	const embed = new MessageEmbed()
		.setFooter(member.displayName, member.user.displayAvatarURL)
		.setThumbnail(member.user.displayAvatarURL)
		.setColor(
			member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor
		)
		.addField(
			"Member information:",
			stripIndents`**> Display name:** ${member.displayName}
			**> Joined at:** ${joined}
			**> Roles:** ${roles}`,
			true
		)
		.addField(
			"User information:",
			stripIndents`**> ID**: ${member.user.id}
			**> Username**: ${member.user.username}
			**> Tag**: ${member.user.tag}
			**> Created at**: ${created}`
		)
		.setTimestamp();

	if (member.user.presence.activities.length > 0)
		embed.addField(
			"Currently playing",
			stripIndents`**> Name:** ${member.user.presence.activities[0].name}`
		);

	message.channel.send(embed);
}
