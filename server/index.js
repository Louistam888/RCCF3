import dotenv from "dotenv";
import connectToDatabase from "./database.js";
import express from "express";
import path from "path";
import cors from "cors";

// import Stripe from "stripe";

//ROUTES
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";

dotenv.config();
connectToDatabase();

const app = express();

app.use(
  cors({
    origin: [
      "http://example1.com",
      "http://localhost:3000",
      "http://localhost:5000",
    ],
  })
);

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json({ limit: "20mb" })(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});

//names after/api/ must match mongoDB collection names
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/", stripeRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV == "development") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(port, () => {
  console.log(`Server runs on port ${port}.`);
});
