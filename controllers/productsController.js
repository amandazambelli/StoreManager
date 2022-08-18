const productsService = require('../services/productsService');

const NOT_FOUND = 'Product not found';

const getAll = async (req, res) => {
  const products = await productsService.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);

  if (!product) {
    return res.status(404).json({ message: NOT_FOUND });
  }

  res.status(200).json(product);
};

const create = async (req, res) => {
  const { name } = req.body;
  const product = await productsService.create(name);

  if (!product) {
    return res.status(404).json({ message: NOT_FOUND });
  }

  res.status(201).json(product);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const product = await productsService.update(id, name);

  if (!product) {
    return res.status(404).json({ message: NOT_FOUND });
  }

  res.status(200).json(product); 
};

const deleted = async (req, res) => {
  const { id } = req.params;

  const product = await productsService.deleted(id);

  if (!product) {
    return res.status(404).json({ message: NOT_FOUND });
  }

  res.status(204).end();
};

const search = async (req, res) => {
  const { q } = req.query;

  if (q === '') {
    const getAllProducts = await productsService.getAll();
    return res.status(200).json(getAllProducts);
  }

  const product = await productsService.search(q);

  if (!product) {
    return res.status(404).json({ message: NOT_FOUND });
  }
    
  res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleted,
  search,
};
