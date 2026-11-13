const {
  createBorrowRequest,
  approveBorrow,
  declineBorrow,
  returnBorrow,
} = require("../services/borrowsService");

const handle = (res, err, fallback) => {
  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(`${fallback}:`, err);
  return res.status(500).json({ error: fallback });
};

const requestBorrowController = async (req, res) => {
  try {
    const borrow = await createBorrowRequest({
      productId: req.body.productId,
      borrowerId: req.user.id,
      days: req.body.days,
    });

    return res.status(201).json({
      message: "Request sent.",
      borrow: borrow,
    });
  } catch (err) {
    return handle(res, err, "Failed to send the request.");
  }
};

const approveBorrowController = async (req, res) => {
  try {
    const borrow = await approveBorrow({ id: req.params.id, ownerId: req.user.id });
    return res.status(200).json({ message: "Request approved.", borrow: borrow });
  } catch (err) {
    return handle(res, err, "Failed to approve the request.");
  }
};

const declineBorrowController = async (req, res) => {
  try {
    const borrow = await declineBorrow({ id: req.params.id, ownerId: req.user.id });
    return res.status(200).json({ message: "Request declined.", borrow: borrow });
  } catch (err) {
    return handle(res, err, "Failed to decline the request.");
  }
};

const returnBorrowController = async (req, res) => {
  try {
    const borrow = await returnBorrow({ id: req.params.id, ownerId: req.user.id });
    return res.status(200).json({ message: "Item marked as returned.", borrow: borrow });
  } catch (err) {
    return handle(res, err, "Failed to record the return.");
  }
};

module.exports = {
  requestBorrowController,
  approveBorrowController,
  declineBorrowController,
  returnBorrowController,
};
