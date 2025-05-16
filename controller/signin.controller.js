const { User } = require("../database/models");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "PROGRAWEB2025";

const createUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    const newUser = await User.create({ name, password, email });

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
    res.status(500).json({ message: "Error del servidor." });
  }
};

module.exports = { createUser };
