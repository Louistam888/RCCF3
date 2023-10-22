import express from "express";
import Brand from "../models/Brand.js";
const brandRoutes = express.Router();

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    if (brands.length === 0) {
      return res.status(404).json({ error: "No brands found" });
    }
    res.json(brands);
       
  } catch (error) {
    console.error("Error in getProduct:", error);
    return res.status(404).json({ error: "An unexpected error occurred." });
  }
};

brandRoutes.route("/shop").get(getBrands);

export default brandRoutes;
