const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;

    if (username.length < 4) {
      return res.status(400).json({ message: "Username should be greater than 4 characters" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(403).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(403).json({ message: "Email already exists" });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(403).json({ message: "Phone number already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password should be at least 6 characters" });
    }

    const hashpass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashpass,
      address,
      phone
    });

    await newUser.save();
    return res.status(200).json({ message: "Signup Successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
