const authMiddleware = (req, res, next) => {

  const sessionId= req.session.userId
  if (!sessionId) {
    return res.status(401).json({
      error: "Please login first.!"
    });
  }

  next();
};

module.exports = authMiddleware;