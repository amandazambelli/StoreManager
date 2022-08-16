const productsModel = require('../models/productsModel');

const saleIsValid = async (req, res, next) => {
  const productId = req.body.every((sale) => sale.productId !== undefined);
  const quantity = req.body.every((sale) => sale.quantity !== undefined);

  console.log(quantity);

  const verifyQuantity = req.body.every((sale) => sale.quantity >= 1);

  if (productId === false) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (quantity === false) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (verifyQuantity === false) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const productValidation = async (req, res, next) => {
  const isValid = await Promise.all(req.body.map((sale) => productsModel.getById(sale.productId)));
  console.log(isValid);

  if (isValid.includes(undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = { saleIsValid, productValidation };
