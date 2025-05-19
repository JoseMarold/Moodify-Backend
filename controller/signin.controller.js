const Sentry = require('@sentry/node');
const { User } = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "PROGRAWEB2025";

const createUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    const existingUser = await User.findOne({
      where: {
        [require("sequelize").Op.or]: [
          { name },
          { email }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({
        message: "El nombre de usuario o el correo ya están registrados.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser.id, name: newUser.name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...userWithoutPassword } = newUser.toJSON();

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    Sentry.captureException(error);
    res.status(500).json({ message: "Error del servidor." });
  }
};

module.exports = { createUser };
