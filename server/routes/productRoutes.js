import express from "express";
import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { protectRoute, admin } from "../middleWare/authMiddleWare.js";

const productRoutes = express.Router();

const getProducts = async (req, res) => {
  const brandRaw = req.params.brand;
  const brand = brandRaw.toLowerCase();
  let products;

  if (brand === "adminconsole") {
    products = await Product.find({});
  } else if (brand) {
    products = await Product.find({ brand }); //retrieve all brands that match
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

//route to create product
const createNewProduct = asyncHandler(async (req, res) => {
  const {
    brand,
    name,
    category,
    stock,
    price,
    image,
    productIsNew,
    description,
  } = req.body;

  //takes all the parameters from the req and creates new product according to mongoose schema
  const newProduct = await Product.create({
    brand,
    name,
    category,
    stock,
    price,
    image,
    productIsNew,
    description,
  });
  await newProduct.save();

  // return whole new product array
  const products = await Product.find({});

  //if a newProduct is saved, return the whole array of products with new product as json
  if (newProduct) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product could not be uploaded.");
  }
});

//route to delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  //if a product with matching ID is found, delete using findByIdAndDelete and return product array without deleted product
  if (product) {
  } else {
    res.status(404);
  }
});

//route to update product
const updateProduct = asyncHandler(async (req, res) => {
  console.log("res received", req.body)
  const {
    brand,
    name,
    image,
    category,
    stock,
    price,
    id,
    productIsNew,
    description,
  } = req.body;

console.log(id, "id")
  //find product with matching ID
  const product = await Product.findById(id);
  console.log("product found in update product function", product)

  //if matching product is found with identical information, replace descriptive information with updated info from the req
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.image = image;
    product.category = category;
    product.stock = stock;
    product.productIsNew = productIsNew;

    //save updated product
    const updatedProduct = await product.save();
    console.log("updated product", updatedProduct)
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

//create reviews
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, userId, title } = req.body;
  const { brand, productId } = req.params; 

  const product = await Product.findOne({ brand, _id: productId });

  const user = await User.findById(userId);


  if (product) {
    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user.toString() === user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed.");
    }

    const review = {
      name: user.firstName + " " + user.lastName,
      rating: Number(rating),
      comment,
      title,
      user: user._id,
    };

    product.reviews.push(review);

    product.numberOfReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review has been saved." });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

//remove reviews

const removeProductReview = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;

    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedReviews = product.reviews.filter(
      (rev) => rev._id.valueOf() !== reviewId
    );

    // Update the product with the filtered reviews
    product.reviews = updatedReviews;
    product.numberOfReviews = product.reviews.length;

    if (product.numberOfReviews > 0) {
      product.rating = product.reviews.reduce(
        (acc, item) => item.rating + acc,
        0
      );
    } else {
      product.rating = 1;
    }

    await product.save();

    res.status(201).json({ message: "Review removed" });
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

productRoutes.route("/").get(getProducts);
productRoutes.route("/adminConsole").get(getProducts);
productRoutes.route("/shop/:brand").get(getProducts);
productRoutes.route("/shop/:brand/:id").get(getProduct);
productRoutes.route("/").put(protectRoute, admin, updateProduct);
productRoutes.route("/ordersuccess").put(protectRoute, updateProduct);
productRoutes.route("/:id").delete(protectRoute, admin, deleteProduct);
productRoutes.route("/").post(protectRoute, admin, createNewProduct);
productRoutes
  .route("/reviews/:brand/:productId")
  .post(protectRoute, admin, createProductReview);
productRoutes
  .route("/:productId/:reviewId")
  .put(protectRoute, admin, removeProductReview);

export default productRoutes;
