const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationcode } = require("../middlewares/Email.js");
require("dotenv").config();

//  In-memory OTP store (use Redis/DB in production)


//  Signup Rout

// POST /api/v1/sign-up
//  Signup Route
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



router.post("/login-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a 6-digit verification code (OTP)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store it in the user's document (for now without expiry)
    user.verificationCode = verificationCode;
    await user.save();
    sendVerificationcode(user.email, verificationCode);
    // Respond with success (but don't send OTP)
    return res.status(200).json({ 
      message: "Verification code generated and stored in database. Please verify it.",
      email: user.email  // So frontend can pass it to /verify-otp
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

