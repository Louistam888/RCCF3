import dotenv from "dotenv";
import connectToDatabase from "./database.js";
import express from "express";
import path from "path";

//ROUTES
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/products", productRoutes);
app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});
app.use("/*", (req, res) => {
  res.status(404).send("Not Found");
});
app.listen(port, () => {
  `Server runs on port ${port}.`;
});

app.use("/api/users", userRoutes);
