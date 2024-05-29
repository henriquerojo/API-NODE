import "dotenv/config";
import express from "express";
import cors from "cors";
import "./database/connection.js";
import ProductCollection from "./database/Product.js";

const app = express();

app.use(express.json());
app.use(cors());

const defaultErrorMessage = "Ocorreu um erro interno, por favor tente novamente";

// Create
app.post("/products", async (request, response) => {
  const { name, price, description } = request.body;

  if (!name || !description || typeof price !== "number") {
    return response.status(400).json({ message: "Invalid request body" });
  }
  const newProduct = new ProductCollection({
    name,
    price,
    description,
  });
  await newProduct.save();
  return response.status(201).json({ newProduct });
});

// Read
app.get("/products", async (request, response) => {
  const allProducts = await ProductCollection.find();

  response.status(200).json({ products: allProducts });
});

// listar apenas um produto
app.get("/products/:id", async (request, response) => {
  try
  {
    const { id } = request.params;

    const productFounded = await ProductCollection.findById(id);

    if (!productFounded){
        return response.status(404).json({ message: "Product not found" });
    }

    response.status(200).json({ product: productFounded });
  }
  catch (error)
  {
    response.status(500).json({ message: error.message || defaultErrorMessage });
  }
});

app.get("/products/:id", async (request, response) => {});

// Update
app.put("/products/:id", async (request, response) => {
  const { id } = request.params;
  const productUpdated = await ProductCollection.findByIdAndUpdate(id, request.body, { new: true });
  response.status(200).json({ product: productUpdated });
});

// Delete
app.delete("/products/:id", async (request, response) => {
  try 
  {
    await ProductCollection.deleteOne({ _id: request.params.id });
    response.status(204).end();  
  } 
  catch (error) 
  {
    response.status(500).json({ message: error.message || defaultErrorMessage });
  }
});

app.listen(3000, () => console.log("Server listening on port 3000"));

// yX2Un5pykobjainV