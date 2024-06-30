const express = require("express");
const user = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    //checking whether this email already exists or not
    const existingUser = await user.findOne({ email: email });

    //If email already exists
    if (existingUser) {
      res.status(409).json({ message: "Email is already registered !" });
      return;
    }

    // If email does not exist, proceed with user registration
    const newUser = await user.create({
      name: name,
      email: email,
      password: password,
      pic: pic,
    });
    res.status(200).json({ message: "success", User: newUser });
  } catch (error) {
    console.log("error message is :  ", error);
    res.status(500).json({ message: "Internal Server Error !" });
  }
});

module.exports = router;
