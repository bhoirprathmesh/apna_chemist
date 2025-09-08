const fs = require("fs");
const csv = require("csv-parser");
const { MongoClient } = require("mongodb");
const path = require("path");

// ✅ Correct Atlas URI (URL-encode special characters in password)
const uri = "mongodb+srv://Aniket:Aniket%24123@cluster0.n6ybiwc.mongodb.net/Apna_chemist";

const client = new MongoClient(uri);

async function uploadCSV() {
  try {
    await client.connect();
    const db = client.db("Apna_chemist");       // ✅ match DB name
    const collection = db.collection("medicines");

    const results = [];

    fs.createReadStream(path.join(__dirname, "medicine.csv"))
      .pipe(csv())
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", async () => {
        if (results.length > 0) {
          await collection.insertMany(results);
          console.log("✅ CSV data uploaded successfully to MongoDB Atlas!");
        } else {
          console.log("⚠️ No data found in CSV.");
        }
        await client.close();
      });

  } catch (err) {
    console.error("❌ Error:", err);
    await client.close();
  }
}

uploadCSV();
