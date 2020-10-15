module.exports = {
	name: "ticket",
	category: "general",
	description: "Put in a help ticket",
	usage: "<inquiry>",
	run: (client, message, args) => {
        message.channel.send(`Ticket created by ${message.author}`);
    }
};