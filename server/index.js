import dotenv from "dotenv";
import connectToDatabase from "./database.js";
import express from "express";
import path from "path";
import cors from "cors";
import Stripe from "stripe";

//ROUTES
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// import stripeRoutes from "./routes/stripeRoutes.js";

dotenv.config();
connectToDatabase();

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

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
// app.use("/api/stripe", cors(), stripeRoutes);

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

//stripe
const stripe = new Stripe(process.env.STRIPE_SECRET);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "No products provided." });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: product.name,
          images: product.image ? [product.image] : undefined, // Ensure this is a valid URL if uncommented
        },
        unit_amount: Math.round(product.price * 100), // Ensure price is in cents
      },
      quantity: product.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/OrderSuccessScreen`, // Use dynamic host
      cancel_url: `${req.protocol}://${req.get("host")}/OrderCancelScreen`, // Use dynamic host
    });

    res.redirect(303, session.url);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
