const express = require("express");
const router = express.Router();

const {
  listProductsController,
  getProductController,
} = require("../controllers/productsController");

router.get("/products", listProductsController);
router.get("/products/:id", getProductController);

module.exports = router;
