var express = require("express");
var router = express.Router();

const { createUser } = require("../controller/signin.controller");

router.post("/", createUser);

module.exports = router;
