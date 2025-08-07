const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otpExpiresAt: {
        type: Date,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String, // URL to the profile picture
        default: "",
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicines",
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicines",
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
    }],
    verificationCode: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
