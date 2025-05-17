const express = require('express');
var router = express();

const verificationController = require("../controller/verification.controller")

router.get("/",verificationController.verification);

module.exports = router;