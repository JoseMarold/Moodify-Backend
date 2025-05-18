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
                model: "users",
                key: "id"
            }
        },
        songrec: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "songs",
                key: "id"
            }
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: "recommendation",
        tableName: "recommendation",
        timestamps: false
    }
);

module.exports = Recommendation;
