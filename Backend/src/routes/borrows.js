const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/login_auth");
const {
  requestBorrowController,
  approveBorrowController,
  declineBorrowController,
  returnBorrowController,
} = require("../controllers/borrowsController");

router.post("/borrows", authMiddleware, requestBorrowController);
router.post("/borrows/:id/approve", authMiddleware, approveBorrowController);
router.post("/borrows/:id/decline", authMiddleware, declineBorrowController);
router.post("/borrows/:id/return", authMiddleware, returnBorrowController);

module.exports = router;
