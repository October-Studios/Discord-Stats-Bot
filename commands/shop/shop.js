const { CurrencyShop } = require("../../dbObjects");

module.exports = {
	name: "shop",
	category: "shop",
	description: "Displays items currently in the shop",
	run: async (client, message) => {
		const items = await CurrencyShop.findAll();
		return message.channel.send(
			items.map((item) => `${item.name}: ${item.cost}`).join("\n"),
			{ code: true }
		);
	},
};
