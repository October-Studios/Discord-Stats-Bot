module.exports = {
	name: "ticket",
	category: "general",
	description: "Put in a help ticket",
	usage: "<string>",
	run: (client, message, args) => {
        let userMessage = message;
        let filter = (reaction, user) => {
            if(user.bot) return false;
            if(reaction.emoji.name === '✅' && user.id === '396178060187271169') {
                return true;
            }
        };
        client.channels.cache.get('751922155217748030').send(`Ticket created by ${message.author}:\n\n${args.join(' ')}\n\nClick the ✅ icon when this issue has been resolved.`)
            .then(message => {
                message.react('✅');
                userMessage.reply(
                    'Ticket received! Expect reply in 24 hours.'
                );
                message.awaitReactions(filter)
                    .then(c => {
                        message.delete();
                    });
            });

    }
};
