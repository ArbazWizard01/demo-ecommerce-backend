const express = require("express");
const cors = require("cors");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());
app.use("./images", express.static(path.join(__dirname, "public/images")))

const uri =
  "mongodb+srv://arbaz957:arbaz4dev@cluster0.shesi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

app.get("/", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("ArbazDev");
    const collection = database.collection("ecom-products");

    const products = await collection.find({}).toArray();
    console.log("Connected successfully to MongoDB");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ error: "An error occured while fetching data" });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
