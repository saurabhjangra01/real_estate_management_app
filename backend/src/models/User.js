const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
    "User",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            defaultValue: null,
        },
    },
    {
        tableName: "user",
        timestamps: false,
    }
);

module.exports = User;
