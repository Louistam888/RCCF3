// import express from "express";
// import dotenv from "dotenv";
// import Stripe from "stripe";

// dotenv.config();
// const stripe = new Stripe(process.env.STRIPE_SECRET);
// const stripeRoutes = express.Router();

// stripeRoutes.get("/", (req, res) => {
//   res.send("Response from Get Route");
//   console.log(res, req)
// });

// stripeRoutes.post("/create-checkout-session", async (req, res) => {
//   const { products } = req.body;

//   if (!products || !Array.isArray(products) || products.length === 0) {
//     return res.status(400).json({ error: "No products provided." });
//   }

//   try {
//     const lineItems = products.map((product) => ({
//       price_data: {
//         currency: "cad",
//         product_data: {
//           name: product.name,
//           images: product.image ? [product.image] : undefined, // Ensure this is a valid URL if uncommented
//         },
//         unit_amount: Math.round(product.price * 100), // Ensure price is in cents
//       },
//       quantity: product.qty,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${req.protocol}://${req.get("host")}/OrderSuccessScreen`, // Use dynamic host
//       cancel_url: `${req.protocol}://${req.get("host")}/OrderCancelScreen`, // Use dynamic host
//     });

//     res.json({ sessionId: session.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// export default stripeRoutes;
