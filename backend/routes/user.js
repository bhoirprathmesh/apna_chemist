const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

//  In-memory OTP store (use Redis/DB in production)
const otpStore = {};

//  Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper to send OTP
async function sendOtp(user, otp) {
  const msg = `Your OTP is ${otp}. It will expire in 30 seconds.`;

  if (user.email) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your OTP Code",
      text: msg,
    });
  }

 
}

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

// Login Step 1: Verify username + password and send OTP
router.post("/login-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate and store OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 30 * 1000;

    otpStore[username] = { otp, expiresAt };

    await sendOtp(user, otp);

    return res.status(200).json({ message: "OTP sent to your email or phone" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Login Step 2: Verify OTP and send JWT
router.post("/verify-otp", async (req, res) => {
  const { username, otp } = req.body;
  const user = await User.findOne({ username });

  if (!user || !otpStore[username]) {
    return res.status(400).json({ message: "Invalid request or no OTP generated" });
  }

  const { otp: storedOtp, expiresAt } = otpStore[username];

  if (Date.now() > expiresAt) {
    // Resend new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[username] = {
      otp: newOtp,
      expiresAt: Date.now() + 30 * 1000,
    };
    await sendOtp(user, newOtp);
    return res.status(408).json({ message: "OTP expired. A new OTP has been sent." });
  }

  if (otp !== storedOtp) {
    return res.status(401).json({ message: "Incorrect OTP" });
  }

  // OTP valid → generate JWT
  delete otpStore[username];

  const authClaims = {
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign({ authClaims }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return res.status(200).json({
    id: user.id,
    role: user.role,
    token,
  });
});

module.exports = router;
