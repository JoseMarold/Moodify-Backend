const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config.js");

class Song extends Model {}

Song.init(
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
        artist: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        album: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        emotionid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Emotions",
                key: "id"
            }
        }
    },
    {
        sequelize,
        modelName: "songs",
        timestamps: false
    }
);

module.exports = Song;
