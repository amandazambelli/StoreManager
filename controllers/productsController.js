const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await productsService.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await productsService.create(name);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const product = await productsService.update(id, name);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
};

const deleted = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productsService.deleted(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleted,
};
