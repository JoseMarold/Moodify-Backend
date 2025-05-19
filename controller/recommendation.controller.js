const Sentry = require('@sentry/node');
const sequelize = require("../database/config.js");
const { fn } = require("sequelize");
const Emotion = require("../database/models/Emotion");
const Song = require("../database/models/Song");
const Recommendation = require("../database/models/Recommendation");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const JWT_SECRET = process.env.JWT_SECRET; 

const getRecommendationsByEmotion = async (req, res) => {
  try {
    const emotionName = req.body.emotionName?.trim();
    const token = req.headers.authorization;
    console.log("emocion recibida", emotionName);

    if (!emotionName) {
      return res.status(400).json({ message: "emotionName is required" });
    }

    if (!token) {
        return res.status(401).json({ message: "Token required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    // get emotion id
    let emotion = await Emotion.findOne({
      where: { name: emotionName }
    });

    if (!emotion) {
        emotion = await Emotion.findOne({
            where: { name:"UNKNOWN"}
        });
    }

    // get random recommended songs from database
    const songs = await Song.findAll({
      where: { emotionid: emotion.id },
      order: [fn('RAND')], 
      limit: 3
    });

    for (const song of songs) {
        await Recommendation.create({
          userrec: userId,
          songrec: song.id
        });
    }
      

    res.json(songs);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    Sentry.captureException(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getRecommendationsByEmotion };
