import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET);
const stripeRoutes = express.Router();

stripeRoutes.get("/", (req, res) => {
  res.send("Response from Get Route");
});

stripeRoutes.post("/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "No products provided." });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: product.name
        },
        unit_amount: Math.round(product.price * 100), // Ensure price is in cents
      },
      quantity: product.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      after_expiration: {
        recovery: {
          enabled: true,
          allow_promotion_codes: true,
        },
      },
      success_url: `${req.protocol}://${req.get("host")}/ordersuccess`, // Use dynamic host
      cancel_url: `${req.protocol}://${req.get("host")}/orderfailed`, // Use dynamic host
    });

    // Send the session URL back to the client instead of redirecting
    res.status(200).json({ sessionUrl: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default stripeRoutes;
