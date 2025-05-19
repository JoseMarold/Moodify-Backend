const Sentry = require('@sentry/node');
const jwt = require("jsonwebtoken");
const { Recommendation, Song, Emotion, User } = require("../database/models");
const dotenv = require('dotenv');

const JWT_SECRET = process.env.JWT_SECRET; 

const getHistoricalRecommendations = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const recommendations = await Recommendation.findAll({
      where: { userrec: userId },
      include: [
        {
          model: Song,
          include: [{ model: Emotion }]
        }
      ]
    });

    const formatted = recommendations.map(rec => ({
      song: rec.song.name,
      artist: rec.song.artist,
      album: rec.song.album,
      emotion: rec.song.Emotion?.name || rec.song.emotion?.name || "UNKNOWN",
      created_at: new Date(rec.created_at).toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Guatemala"
      })
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error retrieving historical recommendations:", error);
    Sentry.captureException(error);
    res.status(401).json({ message: "Invalid token or server error" });
  }
};

module.exports = { getHistoricalRecommendations };
