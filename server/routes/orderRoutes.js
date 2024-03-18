import express from "express";
import asyncHandler from "express-async-handler";
import Orders from "../models/Orders.js";
import { protectRoute } from "../middleWare/authMiddleWare.js";

const orderRoutes = express.Router();

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
    paymentDetails,
    userInfo,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items.");
  } else {
    const order = new Orders({
      orderItems,
      user: userInfo._id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

orderRoutes.route("/").post(protectRoute, createOrder);

export default orderRoutes;
