const router = require("express").Router();
const User = require("../models/user");
const authenticate = require("./userAuth");

// Add a medicine into the cart
router.put("/add-medi-cart", authenticate, async (req, res) => {
    try {
        const { medicineid, id } = req.headers; 

        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMedicineInCart = userData.cart.includes(medicineid);
        if (isMedicineInCart) {
            return res.status(200).json({ message: "Medicine is already in the cart" });
        }

        await User.findByIdAndUpdate(id, { $push: { cart: medicineid } }); // Push medicine into cart

        return res.status(200).json({ message: "Medicine added to cart successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error",err });
    }
});
// delete a medicine into a cart 
router.delete("/delete-medi-cart/:medicineid", authenticate, async (req, res) => {
    try {
        const { medicineid } = req.params; 
        const { id } = req.headers;        
        await User.findByIdAndUpdate(id, { $pull: { cart: medicineid } });

        return res.status(200).json({ message: "Medicine removed from cart" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error",err });
    }
});

// get cart 
router.get("/get-cart-medi", authenticate, async (req, res) => {
    try {
        const id = req.user.id; 

        const userData = await User.findById(id).populate("cart");

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Cart medicine fetched successfully",
            cart: userData.cart
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
});

module.exports = router; 
