const express = require('express');
const router = express.Router();


router.post('/products', validateUser);


module.exports = router
