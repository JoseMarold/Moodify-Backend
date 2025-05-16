const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config.js");

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(15),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "users",
        timestamps: false,
        paranoid: true
    }
);

module.exports = User;
