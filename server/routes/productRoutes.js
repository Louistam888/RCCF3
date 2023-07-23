import express from "express";
import Product from "../models/Product.js";
const productRoutes = express.Router();

const getProducts = async (req, res) => {
  const brandRaw = req.params.brand;
  const brand = brandRaw.toLowerCase();
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
    const brandRaw = req.params.brand;
    const brand = brandRaw.toLowerCase();
    const id = req.params.id;
    let product;
    let brandMatch = false;

    //FUNCTIONS WILL CHECK IF THE URL PARAMS MATCH BRAND AND ID OF ANYTHING IN THE BACKEND

    if (id && brand) {
      product = await Product.findById(id);
      const brandOfProduct = product.brand;
      if (brand === brandOfProduct) {
        brandMatch = true;
      }
    }

    //IF THE URL PARAMS DO NOT MATCH A BRAND OR ID, A HARD 404 ERROR IS RETURNED

    if (!product || brandMatch === false) {
      return res.status(404).json({ error: "No product found." });
    }

    res.json(product);
  } catch (error) {
    console.error("Error in getProduct:", error);
    return res.status(404).json({ error: "An unexpected error occurred." });
  }
};

productRoutes.route("/").get(getProducts);
productRoutes.route("/shop").get(getProducts);
productRoutes.route("/shop/:brand").get(getProducts);
productRoutes.route("/shop/:brand/:id").get(getProduct);

export default productRoutes;
