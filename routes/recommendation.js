var express = require("express");
var router = express.Router();
const { getRecommendationsByEmotion } = require("../controller/recommendation.controller.js");

// Ruta para login
router.post("/", getRecommendationsByEmotion);

module.exports = router;