const express = require("express");
var router = express.Router();
const { getHistoricalRecommendations } = require("../controller/historical.controller");

router.get("/", getHistoricalRecommendations);

module.exports = router;
