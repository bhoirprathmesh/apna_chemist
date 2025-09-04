const express = require("express");
const cors = require("cors"); // ← import cors
const app = express();
require("dotenv").config();
require("./conn/conn");

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true
}));

app.use(express.json()); // Parse JSON body

// Routes
const user = require("./routes/user");
const cart = require("./routes/cart");
const medicine = require("./routes/medicine");

app.use("/api/v1", user);
app.use("/api/v1", cart);
app.use("/api/v1", medicine);


// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
