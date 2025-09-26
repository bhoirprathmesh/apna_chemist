const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
 
  expiryDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ["Tablet", "Capsule", "Syrup", "Injection", "Ointment", "Other"],
    default: "Other",
  },
  prescriptionRequired: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String, // URL to the image
    default: "",
  },
},{
    timestamps:true,
});
module.exports = mongoose.model("Medicines", medicineSchema);