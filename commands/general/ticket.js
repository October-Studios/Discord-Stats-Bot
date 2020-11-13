module.exports = {
	name: "ticket",
	category: "general",
	description: "Put in a help ticket",
	usage: "<string>",
	run: (client, message, args) => {
        let userMessage = message;
        let filter = (reaction, user) => {
            if(user.bot) return false;
            if((reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === '396178060187271169') {
                return true;
            }
        };
        client.channels.cache.get('776496572623224882').send(`Ticket created by ${message.author}:\n\n${args.join(' ')}\n\nClick the ✅ icon when this issue has been resolved.`)
            .then(message => {
                message.react('✅');
                message.react('❌');
                userMessage.reply(
                    'ticket received! Expect reply in 24 hours.'
                );
                const collector = message.createReactionCollector(filter);
                collector.on('collect', r => {
                    if (r.emoji.name === '❌') {
                        message.author.send("Your suggestion has been rejected. If you would like to appeal, PM the owner.");
                    } else {
                        userMessage.author.send("Your ticket has been resolved!");
                    }
                    message.delete();
                });
            });

    }
};
