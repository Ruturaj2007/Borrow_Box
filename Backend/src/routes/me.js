const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middlewares/login_auth');

router.get('/me', authMiddleware, (req, res) => {
  const { id, name, email, enrollmentId, phone } = req.user;

  res.status(200).json({
    user: { id, name, email, enrollmentId, phone },
  });
});

module.exports = router;
