const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 9000;

const corsOptions = {
  origin: ["http://localhost:5173", "https://producthub-13705.web.app"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.96corz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const productCollection = client.db("productHub").collection("products");

    // get all product data from db
    app.get("/products", async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const { search, brand, category, minPrice, maxPrice, sort } = req.query;

      let query = {};
      let sortOption = {};

      // Search
      if (search) {
        query.name = { $regex: search, $options: "i" };
      }

      // Filter by brand
      if (brand) {
        query.brand = brand;
      }

      // Filter by category
      if (category) {
        query.category = category;
      }

      // Filter by price range
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
      }

      // Sorting
      if (sort) {
        switch (sort) {
          case "Price: Low to High":
            sortOption = { price: 1 };
            break;
          case "Price: High to Low":
            sortOption = { price: -1 };
            break;
          case "Date Added: Newest First":
            sortOption = { createdAt: -1 };
            break;
          default:
            sortOption = {};
        }
      }

      try {
        const totalProducts = await productCollection.countDocuments(query);
        const products = await productCollection
          .find(query)
          .sort(sortOption)
          .skip(skip)
          .limit(limit)
          .toArray();

        res.send({
          products,
          currentPage: page,
          totalPages: Math.ceil(totalProducts / limit),
          totalProducts,
        });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error fetching products", error: error.message });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from ProductHub server...");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
