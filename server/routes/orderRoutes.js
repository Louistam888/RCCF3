import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/Orders.js";
import { admin, protectRoute } from "../middleWare/authMiddleWare.js";

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

  const jsonAddress = JSON.parse(shippingAddress);
  console.log("parsable obj", jsonAddress)

  const { address, city, postalCode, stateOrProvince, country } =
   jsonAddress;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items.");
  } else {
    const order = new Order({
      orderItems,
      user: userInfo._id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      shippingAddress: {
        address: address,
        city: city,
        postalCode: postalCode,
        stateOrProvince: stateOrProvince,
        country: country,
      },
      paymentMethod,
      paymentDetails,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  // Added asyncHandler wrapper
  const orders = await Order.find({}); // Changed variable name from Orders to Order
  res.json(orders);
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

const setDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order could not be updated");
  }
});

orderRoutes.route("/").post(protectRoute, createOrder);
orderRoutes.route("/:id").delete(protectRoute, admin, deleteOrder);
orderRoutes.route("/:id").put(protectRoute, admin, setDelivered);
orderRoutes.route("/").get(protectRoute, admin, getOrders);

export default orderRoutes;
