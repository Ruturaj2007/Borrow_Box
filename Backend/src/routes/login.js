const express = require('express');
const router = express.Router();

const {validateUser,logout} = require('../controllers/loginController');

router.post('/login', validateUser);
router.post("/logout", logout);


module.exports = router;