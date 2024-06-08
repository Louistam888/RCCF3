import express from "express";
import asyncHandler from "express-async-handler";
import Orders from "../models/Orders.js";
import { admin, protectRoute } from "../middleWare/authMiddleWare.js";

const orderRoutes = express.Router();

const createOrder = asyncHandler(async (req, res) => {

  console.log("here is the req", req.body)
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

const getOrders = async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
};

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
orderRoutes.route('/:id').delete(protectRoute, admin, deleteOrder);
orderRoutes.route('/:id').put(protectRoute, admin, setDelivered);
orderRoutes.route("/").get(protectRoute, admin, getOrders);

export default orderRoutes;
