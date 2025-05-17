const jwt = require("jsonwebtoken");

const verification = (req, res) => {
    const token = req.headers.authorization;
    console.log("Token: ", token);

    if (!token) {
        res.status(500).json({ message: "Token is required" });
    } else {
        try {
            const tokenDecoded = jwt.verify(token, "PROGRAWEB2025");
            res.status(200).json({ message: "Valid token" });
        } catch (error) {
            res.status(500).json({ message: "Invalid token", error: error });
        }
    }
};

module.exports = { verification };