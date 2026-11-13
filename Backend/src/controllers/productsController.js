const {
  listProducts,
  getProductById,
} = require("../services/productsService");

const listProductsController = async (req, res) => {
  try {
    const products = await listProducts({ category: req.query.category });
    return res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return res.status(500).json({ error: "Failed to fetch products." });
  }
};

const getProductController = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    return res.status(500).json({ error: "Failed to fetch product." });
  }
};

module.exports = {
  listProductsController,
  getProductController,
};
