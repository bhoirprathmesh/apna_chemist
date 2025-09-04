// backend/routes/medicineRoutes.js
const express = require("express");
const Medicine = require("../models/Medicine");

const router = express.Router();

// Add new medicine
router.post("/add", async (req, res) => {
  try {
    const { name, price, description, stock, expiryDate, category, imageUrl } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and Price are required!" });
    }

    const newMedicine = new Medicine({
      name,
      price,
      description,
      stock,
      expiryDate,
      category,
      imageUrl,
    });

    await newMedicine.save();
    res.status(201).json({ message: "Medicine added successfully!", medicine: newMedicine });
  } catch (error) {
    res.status(500).json({ message: "Error adding medicine", error: error.message });
  }
});

module.exports = router;
