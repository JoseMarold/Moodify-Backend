const jwt = require("jsonwebtoken");
const { Recommendation, Song, Emotion, User } = require("../database/models");

const JWT_SECRET = "PROGRAWEB2025";

const getHistoricalRecommendations = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    // Verificar y decodificar token
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    // Buscar recomendaciones del usuario, incluyendo detalles de la canción y la emoción
    const recommendations = await Recommendation.findAll({
      where: { userrec: userId },
      include: [
        {
          model: Song,
          include: [{ model: Emotion }],
        }
      ]
    });

    // Transformar los datos a un formato más útil para el frontend
    const formatted = recommendations.map(rec => ({
      song: rec.song.name,
      artist: rec.song.artist,
      album: rec.song.album,
      emotion: rec.song.emotion.name
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error retrieving historical recommendations:", error);
    res.status(401).json({ message: "Invalid token or server error" });
  }
};

module.exports = { getHistoricalRecommendations };
