import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.status(200).send('ok'));
app.use("/api/products", productsRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Product Listing API",
    endpoints: {
      products: "/api/products",
      examples: {
        all: "/api/products",
        byPrice: "/api/products?minPrice=100&maxPrice=300",
        byPopularity: "/api/products?minPopularity=0.8",
      }
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;

