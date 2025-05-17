const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config.js");

class Emotion extends Model {}

Emotion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "emotion",
        timestamps: false
    }
);

module.exports = Emotion;
