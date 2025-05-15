const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config.js");

class Recommendation extends Model {}

Recommendation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userrec: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id"
            }
        },
        songrec: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Songs",
                key: "id"
            }
        }
    },
    {
        sequelize,
        modelName: "Recommendation",
        timestamps: false
    }
);

module.exports = Recommendation;
