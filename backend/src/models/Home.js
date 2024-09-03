const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Home = sequelize.define(
    "Home",
    {
        street_address: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        state: {
            type: DataTypes.STRING,
        },
        zip: {
            type: DataTypes.STRING,
        },
        sqft: {
            type: DataTypes.FLOAT,
        },
        beds: {
            type: DataTypes.INTEGER,
        },
        baths: {
            type: DataTypes.INTEGER,
        },
        list_price: {
            type: DataTypes.FLOAT,
        },
    },
    {
        tableName: "home",
        timestamps: false,
    }
);

module.exports = Home;
