const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = sequelize.import('models/CurrencyShop');
sequelize.import('models/Users');
sequelize.import('models/UserItems');

const force = process.argv.includes('--force') || process.argv.includes('f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'DiamondShovel', cost: 1, levelRequired: 0, sellPrice: 10, sellable: true }),
		CurrencyShop.upsert({ name: 'Bronze Level I', cost: 100, levelRequired: 0, sellPrice: 50, sellable: true }),
    CurrencyShop.upsert({ name: 'Bronze Level II', cost: 200, levelRequired: 0, sellPrice: 100, sellable: true }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);

