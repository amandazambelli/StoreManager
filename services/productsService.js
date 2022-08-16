const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) return null;

  return product;
};

const create = async (name) => {
  const product = await productsModel.create({ name });

  if (!product) return null;

  return product;
};

const update = async (id, name) => {
  const getProduct = await productsModel.getById(id);
  console.log(getProduct);

  if (!getProduct) return null;

  const product = await productsModel.update({ id, name });

  return product;
};

const deleted = async (id) => {
  const getProduct = await productsModel.getById(id);

  if (!getProduct) return null;

  const product = await productsModel.deleted(id);

  return product;
};

const search = async (name) => {
  const product = await productsModel.search(name);

  console.log(`prod sv ${product}`);

  if (!product || product.length === 0) return null;

  return product;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleted,
  search,
};
