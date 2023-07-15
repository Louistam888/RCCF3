import dotenv from "dotenv";
import connectToDatabase from "./database.js";
import express from "express";
import path from "path";

//ROUTES
import productRoutes from "./routes/productRoutes.js";
import shopBrandRoutes from "./routes/shopBrandRoutes.js";

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/products", productRoutes);
app.use("/api/products", shopBrandRoutes);

app.listen(port, () => {
  console.log(`Server runs on port ${port}.`);
});
