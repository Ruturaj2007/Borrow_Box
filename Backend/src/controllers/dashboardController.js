const {
  getMyProducts,
  getMyBorrows,
  getMyLendings,
} = require("../services/dashboardService");

const getMyProductsController = async (req, res) => {
  try {
    const products = await getMyProducts(req.user.id);
    return res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching user products:", err);
    return res.status(500).json({ error: "Failed to fetch listed products." });
  }
};

const getMyBorrowsController = async (req, res) => {
  try {
    const borrows = await getMyBorrows(req.user.id);
    return res.status(200).json(borrows);
  } catch (err) {
    console.error("Error fetching user borrows:", err);
    return res.status(500).json({ error: "Failed to fetch borrowed products." });
  }
};

const getMyLendingsController = async (req, res) => {
  try {
    const lendings = await getMyLendings(req.user.id);
    return res.status(200).json(lendings);
  } catch (err) {
    console.error("Error fetching user lendings:", err);
    return res.status(500).json({ error: "Failed to fetch lending requests." });
  }
};

module.exports = {
  getMyProductsController,
  getMyBorrowsController,
  getMyLendingsController,
};

