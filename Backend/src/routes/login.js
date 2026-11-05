const express = require('express');
const router = express.Router();

const validateUser = require('../controllers/loginController');

router.post('/login', validateUser);

module.exports = router;