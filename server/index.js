import dotenv from "dotenv";
import connectToDatabase from "./database.js";
import express from "express";
import path from "path";

//ROUTES
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";

dotenv.config();
connectToDatabase();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/brands", brandRoutes);

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});
app.use("/*", (req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  `Server runs on port ${port}.`;
});
