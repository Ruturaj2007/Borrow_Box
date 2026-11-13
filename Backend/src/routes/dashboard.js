const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/login_auth");
const {
  getMyProductsController,
  getMyBorrowsController,
  getMyLendingsController,
} = require("../controllers/dashboardController");

router.get("/myproducts", authMiddleware, getMyProductsController);
router.get("/myborrows", authMiddleware, getMyBorrowsController);
router.get("/mylendings", authMiddleware, getMyLendingsController);

// router.get("/my-products", authMiddleware, getMyProductsController);
// router.get("/my-borrows", authMiddleware, getMyBorrowsController);
// router.get("/my-lendings", authMiddleware, getMyLendingsController);

module.exports = router;

