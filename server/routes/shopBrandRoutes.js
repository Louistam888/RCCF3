import express from "express";
import Product from "../models/Product.js";
const shopBrandRoutes = express.Router();

const getBrands = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

shopBrandRoutes.route("/").get(getBrands);

export default shopBrandRoutes;
