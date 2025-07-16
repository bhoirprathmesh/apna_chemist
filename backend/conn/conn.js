const mongoose = require("mongoose");
require("dotenv").config();
const conn = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    }
    catch(error){
           console.log("failed to connect database",error.message);
    }
}
conn();