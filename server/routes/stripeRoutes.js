import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET);
const stripeRoutes = express.Router();
const endpointSecret = process.env.STRIPE_ENDPOINT; //change for web endpoint

stripeRoutes.post("/create-checkout-session", async (req, res) => {
  try {
    const { products, shipping, addressInfo, email } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "No products provided." });
    }

    // Calculate tax
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.price * 100), // Ensure price is in cents
      },
      quantity: product.qty,
    }));

    // Create stripe session
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: shipping * 100,
              currency: "cad",
            },
            display_name: "Express shipping", // Example: display name for shipping
          },
        },
      ],
      payment_method_types: ["card"],
      line_items: lineItems,
      automatic_tax: {
        enabled: true,
      },
      metadata: {
        addressInfo: JSON.stringify(addressInfo),
      },
      mode: "payment",
      after_expiration: {
        recovery: {
          enabled: true,
          allow_promotion_codes: true,
        },
      },
      success_url: "https://rccf3.onrender.com/ordersuccess",
      cancel_url: "https://rccf3.onrender.com/orderfailed",
    });

    // Send the session URL back to the client instead of redirecting
    res.status(200).json({ sessionUrl: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

let latestSession = null;

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
      latestSession = session;
    } else {
      console.log("Received event of type:", event.type);
    }

    response.status(200).end();
  }
);
//endpoint for checking completed checkout session object
// in cli use
// stripe login
// listen stripe listen --forward-to localhost:5000/webhook
stripeRoutes.get("/latestSession", (req, res) => {
  if (latestSession) {
    res.json(latestSession);
  } else {
    res.status(404).send("no session data available");
  }
});

export default stripeRoutes;
