const Sentry = require('@sentry/node');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../database/models");

const JWT_SECRET = "PROGRAWEB2025";

const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res
      .status(400)
      .json({ message: "Login failed", error: "Name and password required" });
  }

  try {
    const user = await User.findOne({ where: { name } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid user or password (user not found)" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Invalid user or password (wrong password)" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    Sentry.captureException(error);
    res.status(500).json({ message: "Login failed", error: "Server error" });
  }
};

module.exports = { login };
