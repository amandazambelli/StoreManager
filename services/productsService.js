const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) return null;

  return product;
};

module.exports = {
  getAll,
  getById,
};