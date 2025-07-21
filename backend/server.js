const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");

app.use(express.json()); //  Parse JSON request body

const user = require("./routes/user");
const cart = require("./routes/cart");

app.use("/api/v1", user);
app.use("/api/v1", cart);

app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
});
