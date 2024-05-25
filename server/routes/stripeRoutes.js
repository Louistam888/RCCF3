import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET);
const stripeRoutes = express.Router();

const frontendBaseUrl =
  process.env.RENDER === "production" ? "rccf3.onrender.com" : "localhost:3000";

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

//check if payment was successful from stripe
// const bodyParser = require("body-parser");
// const endpointSecret = "whsec_...";

// stripeRoutes.post(
//   "/webhook",
//   bodyParser.raw({ type: "application/json" }),
//   (request, response) => {
//     const payload = request.body;
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//       // Verify the event
//       event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//     } catch (err) {
//       // Return error if verification fails
//       return response.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle specific event types
//     if (event.type === "checkout.session.completed") {
//       // This event is triggered when a checkout session is completed
//       const session = event.data.object;
//       // Process the completed checkout session (e.g., update your database)
//       console.log("Checkout session completed:", session.id);
//     } else {
//       // Ignore other event types
//       console.log("Received event of type:", event.type);
//     }

//     // Respond with success status
//     response.status(200).end();
//   }
// );

// stripeRoutes.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   (request, response) => {
//     console.log("recieved webhook req")
//     const payload = request.body;
//     console.log("payload", payload)
//     const sig = request.headers["stripe-signature"];
//     const endpointSecret =
//       "whsec_d299b4686ed2365f8780f59027e8b3e493cc6678181496df2bb47e352eac0971"; //todo swap this testing endpoint for actual url later

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//       console.log(event)
//     } catch (err) {
//       return response.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       console.log("Checkout session completed:", session.id);
//     } else {
//       console.log("Received event of type:", event.type);
//     }

//     response.status(200).end();
//   }
// );

stripeRoutes.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    console.log("recieved webhook req");
    const payload = request.body;

    console.log("got payload", payload);

    response.status(200).end();
  }
);

export default stripeRoutes;
