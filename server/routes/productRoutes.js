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

const getProduct = async (req, res) => {
  try {
    const brand = req.params.brand;
    const id = req.params.id;
    let product;

    if (id && brand) {
      product = await Product.findById(id);
    }

    if (!product) {
      return res.status(404).json({ error: "No product found." });
    }

    res.json(product);
  } catch (error) {
    console.error("Error in getProduct:", error);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
};

productRoutes.route("/").get(getProducts);
productRoutes.route("/shop").get(getProducts);
productRoutes.route("/shop/:brand").get(getProducts);
productRoutes.route("/shop/:brand/:id").get(getProduct);

export default productRoutes;
