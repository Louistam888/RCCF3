import express from "express";
import User from "../models/User.js";
import Order from "../models/Orders.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { protectRoute, admin } from "../middleWare/authMiddleWare.js";

const userRoutes = express.Router();

const genToken = (id) => {
  //TODO redefine to expire in one hour in production
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "60d" });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json("We already have an account with that email address.");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    });
  } else {
    res.json(400);
    throw new Error("Invalid user data");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id),
      createdAt: updatedUser.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No orders found");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404);
    throw new Error("User not found");
  }
});

userRoutes.route("/login").post(loginUser);
userRoutes.route("/register").post(registerUser);
userRoutes.route("/profile/:id").put(protectRoute, updateUserProfile);
userRoutes.route("/:id").get(protectRoute, getUserOrders);
userRoutes.route("/").get(protectRoute, admin, getUsers);
userRoutes.route("/:id").delete(protectRoute, admin, deleteUser);

export default userRoutes;
