const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middlewares/login_auth');
const upload = require('../configs/multer');
const createProductController = require('../controllers/addProductsController');

router.post('/addproducts', authMiddleware, upload.array('images', 4), createProductController);

module.exports = router;
