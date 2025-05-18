const express = require("express");
var router = express.Router();
const { getAnalysis } = require("../controller/rekognition.controller.js");

router.post("/", getAnalysis);

module.exports = router;