const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationcode } = require("../middlewares/Email.js");
require("dotenv").config();


// ============================
//   Signup Route
// ============================
// POST /api/v1/sign-up
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
      phone,
      role: "user" // default role
    });

    await newUser.save();
    return res.status(200).json({ message: "Signup Successfully" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// ============================
//   Login Route (User + Admin)
// ============================
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

    // ✅ If role = admin → direct login (no OTP)
    if (user.role === "admin") {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(200).json({
        message: "Admin login successful",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    }

    // ✅ If role = user → OTP flow
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP and expiry (60 seconds)
    user.verificationCode = verificationCode;
    user.otpExpiresAt = new Date(Date.now() + 60 * 1000);
    await user.save();

    // Send OTP via email
    await sendVerificationcode(user.email, verificationCode);

    return res.status(200).json({
      message: "Verification code sent. Please check your email.",
      email: user.email // to be used for /verify-otp
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// ============================
//   Verify OTP (User only)
// ============================
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is expired
    if (!user.otpExpiresAt || new Date() > user.otpExpiresAt) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // Check if OTP matches
    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ Mark user as verified
    user.isVerified = true;

    // ✅ Clear OTP and expiry
    user.verificationCode = null;
    user.otpExpiresAt = null;

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "OTP verified successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// ============================
//   Resend OTP
// ============================
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optional: prevent spamming OTP
    const now = new Date();
    if (user.otpExpiresAt && now < user.otpExpiresAt) {
      const remaining = Math.ceil((user.otpExpiresAt - now) / 1000);
      return res.status(400).json({ message: `Please wait ${remaining}s before resending OTP.` });
    }

    // Generate and send new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = newOtp;
    user.otpExpiresAt = new Date(Date.now() + 60 * 1000);
    await user.save();

    await sendVerificationcode(user.email, newOtp);

    res.status(200).json({ message: "OTP resent successfully." });

  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get-user-details
router.get("get-user-details",authenticate,async(req,res)=>{
  try{
    const {id} = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);

  }
  catch(error){
    return res.status(500).json({message:"Internal server error"});

  }
})

// update a user information
router.put("update-user-address",authenticate,async(req,res)=>{
  try{
    const {id} = req.headers;
    const {address} = req.body;
     if (!address || address.trim() === "") {
      return res.status(400).json({ message: "Address is required" });
    }
    const updateaddress = await User.findByIdAndUpdate(
      id,
      {address : address},
      { new :true}
    );

    if(!updateaddress){
      return res.status(404).json("user not found");
    }
 return res.status(200).json({
      message: "Address updated successfully",
      data: updateaddress, // optional: send back updated data
    });
  }
  catch(error){
    return res.status(500).json({message:"Internal server error"});
  }
})




module.exports = router;
