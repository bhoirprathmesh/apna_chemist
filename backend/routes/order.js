const router = require("express").Router();
const User = require("./models/user");
const Medicine = require("./models/medicine");
const Order = require("./models/order");
const authenticate = require("./userAuth");

// book an order 
router.put("/place-order", authenticate, async (req, res) => {
    try {
        const { id } = req.headers; // user id from headers
        const { medicineid, totalPrice, quantity } = req.body;

        // Check if medicine exists
        const med = await Medicine.findById(medicineid);
        if (!med) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        // Create new order
        const newOrder = new Order({
            user: id,
            medicines: [{
                medicine: medicineid,
                totalPrice: totalPrice,
                quantity: quantity || 1,
            }],
        });

        const saveOrder = await newOrder.save();

        // Update user (push order and pull medicine from cart)
        await User.findByIdAndUpdate(id, {
            $push: { orders: saveOrder._id },
            $pull: { cart: medicineid }
        });

        return res.status(200).json({ message: "Medicine ordered successfully", order: saveOrder });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// get a order of particular user
router.get("/get-order-particular-user", authenticate, async (req, res) => {
  try {
    const { id } = req.headers; // user id

    const orders = await Order.find({ user: id })
      .populate("medicines.medicine") // populate medicine details
      .sort({ createdAt: -1 });       // sort latest first

    return res.json({
      status: "success",
      data: orders,
    });

  } catch (error) {
    console.error("Error in get-order-history:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
});
// get all orders

router.get("/get-all-order", authenticate, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user")                // populate user details
      .populate("medicines.medicine"); // populate medicine details

    return res.status(200).json({
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error in get-all-order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// Update order status by admin
router.put("/update-order-status/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { "medicines.$[].status": status } }, // update all medicines' status
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
