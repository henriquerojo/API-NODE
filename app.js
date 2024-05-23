import express from "express";
import cors from "cors";
import connectDB from "./database/connection.js";
import Product from "./database/Product.js";

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

// Create
app.post("/products", async (request, response) => {
  const { name, price, description } = request.body;

  if (!name || !description || typeof price !== "number") {
    return response.status(400).json({ message: "Invalid request body" });
  }

  const product = new Product(request.body);
  await product.save();

  response.status(201).json({ product });
});

// Read
app.get("/products", async (request, response) => {
  const products = await Product.find();
  response.status(200).json(products);
});

app.get("/products/:id", async (request, response) => {
  const product = await Product.findOne({ _id: request.params.id });
  response.status(200).json({ product });
});

// Update
app.put("/products/:id", async (request, response) => {
  const product = await Product.findByIdAndUpdate(request.params.id, request.body);
  await product.save();
  response.status(200).json({ product });
});

// Delete
app.delete("/products/:id", async (request, response) => {
  await Product.deleteOne({ _id: request.params.id });
  response.status(204).end();
});

app.listen(3000, () => console.log("Server listening on port 3000"));
