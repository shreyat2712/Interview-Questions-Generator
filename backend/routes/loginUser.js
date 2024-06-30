const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists in the database
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email !" });
    }

    // Check if password is correct
    if (user.password != password) {
      return res.status(401).json({ error: "Invalid password !" });
    }
    // If email and password are correct, generate JWT token
    const token = jwt.sign({ userId: user._id }, "somerandomtoken", {
      expiresIn: "1w",
    }); // Sign token with secret key and set expiration time

    // Return token and success message
    res.status(200).json({ token: token, pic:user.pic, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
