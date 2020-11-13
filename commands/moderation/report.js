const { getMember } = require("../../functions.js");
module.exports = {
    name: "report",
    category: "moderation",
    description: "Report a user to the moderators for breaking server rules.",
    usage: "<user> <reason>",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));
        let reason = "";
        for (let i = 1; i < args.size(); i++) {
            reason += `${args[i]} `;
        }
        if (!args[0] || !args[1]) {
            return message.channel.send("Please provide both a user and a reason for reporting.");
        }
        client.channels.cache.get('776606685442736139').send(`${message.author} reported ${member.user} for ${reason}`);
    },
};