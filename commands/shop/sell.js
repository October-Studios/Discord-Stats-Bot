const { Users, CurrencyShop } = require("../../dbObjects");
const currency = require("../../bot.js");
const { Op } = require("sequelize");

module.exports = {
	name: "sell",
	category: "shop",
	description: "Sell an item for a fraction of the original cost",
	usage: "<item>",
	run: async (client, message, args) => {
		const user = await Users.findOne({ where: { user_id: message.author.id } });
		const items = await user.getItems();
		const item = await CurrencyShop.findOne({
			where: { name: { [Op.like]: args[0] } },
		});
		if (!item) return message.channel.send(`That item doesn't exist.`);
		if (!items.map((i) => i.item.name).includes(item.name) || !items.length)
			return message.channel.send(
				`You can't sell that item because you don't own it!`
			);
		if (
			items.map((i) => i.item.name).includes(item.name) &&
			item.sellable === true
		) {
			if (!args[1] && items.map((i) => i.amount)[0] > 0) {
				currency.add(message.author.id, item.sellPrice);
				await user.removeItem(item);
			} else {
				if (args[1] <= items.map((i) => i.amount)[0] && args[1] > 0) {
					currency.add(message.author.id, item.sellPrice * args[1]);
					for (var i = 0; i < items.map((i) => i.amount)[0]; i++) {
						await user.removeItem(item);
					}
				} else {
					return message.channel.send("You do not have that many!");
				}
			}
		} else {
			return message.channel.send("That item is not sellable.");
		}
		message.channel.send(`You've sold ${item.name} for ${item.sellPrice}.`);
	},
};
