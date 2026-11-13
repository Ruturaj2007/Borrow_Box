const prisma = require("../configs/db");

const DAY = 24 * 60 * 60 * 1000;

const fail = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const createBorrowRequest = async ({ productId, borrowerId, days }) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    throw fail("No such item.", 404);
  }

  if (product.ownerId === borrowerId) {
    throw fail("You can't borrow your own item.", 400);
  }

  if (!product.isAvailable) {
    throw fail("This item is already out with someone.", 409);
  }

  const alreadyAsked = await prisma.borrowingItem.findFirst({
    where: { productId, borrowerId, status: "PENDING" },
  });

  if (alreadyAsked) {
    throw fail("You already asked for this item.", 409);
  }

  const wanted = Number(days) > 0 ? Number(days) : product.maxBorrowDays;
  const borrowDays = Math.min(wanted, product.maxBorrowDays);

  return await prisma.borrowingItem.create({
    data: {
      productId,
      borrowerId,
      ownerId: product.ownerId,
      status: "PENDING",
      returnDeadline: new Date(Date.now() + borrowDays * DAY),
    },
  });
};

const findOwnRequest = async (id, ownerId) => {
  const borrow = await prisma.borrowingItem.findUnique({ where: { id } });

  if (!borrow) {
    throw fail("No such request.", 404);
  }

  if (borrow.ownerId !== ownerId) {
    throw fail("That request isn't on your item.", 403);
  }

  if (borrow.status !== "PENDING") {
    throw fail("That request has already been settled.", 409);
  }

  return borrow;
};

const approveBorrow = async ({ id, ownerId }) => {
  const borrow = await findOwnRequest(id, ownerId);

  return await prisma.$transaction(async (tx) => {
    const approved = await tx.borrowingItem.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    await tx.product.update({
      where: { id: borrow.productId },
      data: { isAvailable: false },
    });

    await tx.borrowingItem.updateMany({
      where: {
        productId: borrow.productId,
        status: "PENDING",
        id: { not: id },
      },
      data: { status: "DECLINED" },
    });

    return approved;
  });
};

const declineBorrow = async ({ id, ownerId }) => {
  await findOwnRequest(id, ownerId);

  return await prisma.borrowingItem.update({
    where: { id },
    data: { status: "DECLINED" },
  });
};

const returnBorrow = async ({ id, ownerId }) => {
  const borrow = await prisma.borrowingItem.findUnique({ where: { id } });

  if (!borrow) {
    throw fail("No such request.", 404);
  }

  if (borrow.ownerId !== ownerId) {
    throw fail("That request isn't on your item.", 403);
  }

  if (borrow.status !== "APPROVED") {
    throw fail("That item isn't out on loan.", 409);
  }

  return await prisma.$transaction(async (tx) => {
    const returned = await tx.borrowingItem.update({
      where: { id },
      data: { status: "RETURNED", returnDate: new Date() },
    });

    await tx.product.update({
      where: { id: borrow.productId },
      data: { isAvailable: true },
    });

    return returned;
  });
};

module.exports = {
  createBorrowRequest,
  approveBorrow,
  declineBorrow,
  returnBorrow,
};
