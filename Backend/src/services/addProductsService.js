const {prisma} = require('../configs/db');

const createProducts = async (productsDetails,owner_id)=>{
  try {
    const {
      title,
      description,
      category,
      condition,
      maxBorrowDays
    } = productsDetails;
    
    const product = await prisma.product.create({
      data: {
        title,
        description,
        category,
        condition: condition,
        maxBorrowDays: parseInt(maxBorrowDays),
        ownerId: owner_id
      }
    });

    return product
    
    
  } catch (err) {
    console.error(`error while creating products: ${err.message}`)
    throw err;
  }
  

  
}

module.exports = { createProducts };
