const { CurrencyShop } = require("../../dbObjects");
export const name = "shop";
export const category = "shop";
export const description = "Displays items currently in the shop";
export async function run(client, message) {
	const items = await CurrencyShop.findAll();
	return message.channel.send(
		items.map((item) => `${item.name}: ${item.cost}`).join("\n"),
		{ code: true }
	);
}
