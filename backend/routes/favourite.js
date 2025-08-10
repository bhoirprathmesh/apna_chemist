const router = require("express").Router();
const User = require("../models/user");
const authenticate = require("./userAuth");

// Add a medicine to favourites
router.put("/add-medi-favourite", authenticate, async (req, res) => {
    try {
        const { medicineid } = req.headers;
        const id = req.user.id; // safer than headers
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.favorites.includes(medicineid)) {
            return res.status(200).json({ message: "Medicine is already in favourites" });
        }
        await User.findByIdAndUpdate(id, { $push: { favorites: medicineid } });
        return res.status(200).json({ message: "Medicine added to favourites successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", err });
    }
});

// Delete a medicine from favourites
router.delete("/delete-medi-favourite/:medicineid", authenticate, async (req, res) => {
    try {
        const { medicineid } = req.params;
        const id = req.user.id; // safer
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.favorites.includes(medicineid)) {
            await User.findByIdAndUpdate(id, { $pull: { favorites: medicineid } });
            return res.status(200).json({ message: "Medicine removed from favourites" });
        }
        return res.status(400).json({ message: "Medicine not in favourites" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error", err });
    }
});

// Get all favourite medicines
router.get("/get-favourite-medicines", authenticate, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id).populate("favorites");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "Favourite medicines fetched successfully",
            favorites: user.favorites
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error });
    }
});

module.exports = router;
