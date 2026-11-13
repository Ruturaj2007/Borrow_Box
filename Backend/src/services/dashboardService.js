const prisma = require("../configs/db");

const getMyProducts = async (ownerId) => {
  return await prisma.product.findMany({
    where: { ownerId },
    include: {
      images: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const getMyBorrows = async (borrowerId) => {
  return await prisma.borrowingItem.findMany({
    where: { borrowerId },
    include: {
      product: {
        include: {
          images: true,
        },
      },
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getMyLendings = async (ownerId) => {
  return await prisma.borrowingItem.findMany({
    where: { ownerId },
    include: {
      product: {
        include: {
          images: true,
        },
      },
      borrower: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

module.exports = {
  getMyProducts,
  getMyBorrows,
  getMyLendings,
};

