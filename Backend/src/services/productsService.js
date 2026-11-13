const prisma = require("../configs/db");

const listProducts = async ({ category } = {}) => {
  return await prisma.product.findMany({
    where: category && category !== "All" ? { category } : {},
    include: {
      images: true,
      owner: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      owner: { select: { id: true, name: true } },
    },
  });
};

module.exports = {
  listProducts,
  getProductById,
};
