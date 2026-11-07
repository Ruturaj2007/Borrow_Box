const express = require("express");
const router = express.Router();

const { createProducts } = require("../services/addProductsService");

const createProductController = async (req, res) => {
  // console.log("Authenticated user:", req.user);
  

  try {
    const owner_id = req.user.id;
    
    const product = await createProducts(req.body,owner_id);

    if (!product) {
      return res.status(500).json({ error: "Failed to create product." });  
    }

    return res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch(err) {
    console.log(err);
    return res.status(500).json({
      message: "Error adding product",
      error: err.message,
    });
  }
};

module.exports = createProductController;
