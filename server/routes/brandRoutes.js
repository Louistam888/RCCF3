import express from "express";
import Brand from "../models/Brand.js";
import asyncHandler from 'express-async-handler';
import { protectRoute, admin } from "../middleWare/authMiddleWare.js";

const brandRoutes = express.Router();

//get brands
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

//route to update brand
const updateBrand = asyncHandler(async (req, res) => {
  const { brandName, id, image } = req.body;

  //find product with matching ID
  const brand = await Brand.findById(id);

  //if matching product is found with identical information, replace descriptive information with updated info from the req
  if (brand) {
    brand.name = brandName;
    brand.image = image;

    //save updated product
    const updatedBrand = await brand.save();
    res.json(updatedBrand);
  } else {
    res.status(404);
    throw new Error("Brand not found.");
  }
});

brandRoutes.route("/").put(protectRoute, admin, updateBrand);
brandRoutes.route("/shop").get(getBrands);

export default brandRoutes;
