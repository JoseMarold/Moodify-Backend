var express = require("express");
var router = express.Router();
const { login } = require("../controller/login.controller");

// Ruta para login
router.post("/", login);

module.exports = router;
