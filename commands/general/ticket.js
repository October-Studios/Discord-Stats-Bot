module.exports = {
	name: "ticket",
	category: "general",
	description: "Put in a help ticket",
	usage: "<string>",
	run: (client, message, args) => {
        client.channels.cache.get('751922155217748030').send(`Ticket created by ${message.author}:\n\n${args.join(' ')}`);

    }
};
