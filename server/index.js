import dotenv from "dotenv";
import connectToDatabase from "./database.js";
import express from "express";
import path from "path";

//ROUTES
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";

dotenv.config();
connectToDatabase();
const port = process.env.PORT || 5000;

const app = express();
app.use(
  express.json({
    limit: "10mb",
  })
);

//names after/api/ must match mongoDB collection names
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/users", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/stripe", stripeRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(port, () => {
  console.log(`Server runs on port ${port}.`);
});
