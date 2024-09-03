const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Home = require("./Home");

const UserHome = sequelize.define(
    "UserHome",
    {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: User,
                key: "username",
            },
        },
        street_address: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: Home,
                key: "street_address",
            },
        },
    },
    {
        tableName: "user_home",
        timestamps: false,
    }
);

User.belongsToMany(Home, { through: UserHome, foreignKey: "username" });
Home.belongsToMany(User, { through: UserHome, foreignKey: "street_address" });

module.exports = UserHome;
