import express from "express";
import Product from "../models/Product.js";
const productRoutes = express.Router();

const getProducts = async (req, res) => {
  const brand = req.params.brand;
  let products;

  if (brand) {
    products = await Product.find({ brand });
  } else {
    products = await Product.find({});
  }

  if (products.length === 0) {
    return res.status(404).json({ error: "No results for this brand." });
  }

  res.json(products);
};

productRoutes.route("/").get(getProducts);
productRoutes.route("/shop").get(getProducts);
productRoutes.route("/shop/:brand").get(getProducts);
productRoutes.route("/shop/:brand/:").get(getProducts);

export default productRoutes;
