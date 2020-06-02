module.exports = {
	name: "ping",
	category: "info",
	description: "Returns latency and API ping",
	run: async (client, message, args) => {
		const msg = await message.channel.send(`:ping_pong: Pinging....`);

		msg.edit(`:ping_pong: Pong!
		Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
		API Latency is ${Math.round(client.ws.ping)}ms`);
	}
}
