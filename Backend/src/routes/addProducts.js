const express = require('express');
const router = express.Router();


const { authMiddleware } = require('../middlewares/login_auth');

const createProductController = require('../controllers/addProductsController')


router.post('/products',authMiddleware,createProductController)




module.exports = router;