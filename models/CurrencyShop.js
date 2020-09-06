module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"currency_shop",
		{
			name: {
				type: DataTypes.STRING,
				unique: true,
			},
			cost: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			levelRequired: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			sellPrice: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			sellable: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
