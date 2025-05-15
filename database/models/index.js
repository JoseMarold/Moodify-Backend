const sequelize = require("../config");
const User = require("./User");
const Emotion = require("./Emotion");
const Song = require("./Song");
const Recommendation = require("./Recommendation.js");
require("./associations");

sequelize.sync({ force: false })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Sequelize error:", err);
  });

module.exports = {
  sequelize, User,Emotion,Song, Recommendation
};
