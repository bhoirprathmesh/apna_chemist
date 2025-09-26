const router = require("express").Router();
const Medicine = require("../models/medicine");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authenticate = require("./userAuth");

// add a medicine
router.post("/add-medi", authenticate, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role != "admin") {
      return res.status(400).json({ message: "User is not valid" });
    }
    const medicine = new Medicine({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      expiryDate: req.body.expiryDate,
      category: req.body.category,
      prescriptionRequired: req.body.prescriptionRequired,
      description: req.body.description,
      image: req.body.image,
    });

    await medicine.save();
    return res.status(200).json({message:"medicine added succesfully"})
  } catch (error) {}
});

module.exports=router;