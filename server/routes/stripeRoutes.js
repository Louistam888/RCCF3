import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET);
const stripeRoutes = express.Router();

const frontendBaseUrl =
  process.env.RENDER === "production" ? "rccf3.onrender.com" : "localhost:3000";
const endpointSecret =
  "whsec_d299b4686ed2365f8780f59027e8b3e493cc6678181496df2bb47e352eac0971"; //todo swap this testing endpoint for actual url later

stripeRoutes.get("/", (req, res) => {
  res.send("Response from Get Route");
});

stripeRoutes.post("/create-checkout-session", async (req, res) => {
  try {
    const { products, shipping, expressShipping } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "No products provided." });
    }

    //calculate tax
    const taxRate = await stripe.taxRates.create({
      display_name: "Ontario HST",
      description: "Harmonized Sales Tax for Ontario",
      percentage: 13,
      jurisdiction: "CA", // Jurisdiction code for Canada
      inclusive: false,
    });
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.price * 100), // Ensure price is in cents
      },
      tax_rates: [taxRate.id],
      quantity: product.qty,
    }));

    //create stripe session
    const session = await stripe.checkout.sessions.create({
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: Math.round(shipping * 100),
              currency: "cad",
            },
            display_name: expressShipping
              ? "Express shipping"
              : shipping > 0
              ? "Standard shipping"
              : "Free shipping",
          },
        },
      ],
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      after_expiration: {
        recovery: {
          enabled: true,
          allow_promotion_codes: true,
        },
      },
      success_url: `${req.protocol}://${frontendBaseUrl}/ordersuccess`,
      cancel_url: `${req.protocol}://${frontendBaseUrl}/orderfailed`,
    });

    // Send the session URL back to the client instead of redirecting
    res.status(200).json({ sessionUrl: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

stripeRoutes.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const payload = request.body;
    const sig = request.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
    } else {
      console.log("Received event of type:", event.type);
    }

    response.status(200).end();
  }
);

export default stripeRoutes;
