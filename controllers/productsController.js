const productsService = require('../services/productsService');

const NOT_FOUND = 'Product not found';

const getAll = async (req, res) => {
  const products = await productsService.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);

    if (!product) {
      return res.status(404).json({ message: NOT_FOUND });
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
      return res.status(404).json({ message: NOT_FOUND });
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
    console.log(product);

    if (!product) {
      return res.status(404).json({ message: NOT_FOUND });
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
      return res.status(404).json({ message: NOT_FOUND });
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
};

const search = async (req, res) => {
  try {
    const { q } = req.query;

    console.log(`q ${q}`);

    const getProducts = await productsService.getAll();

    console.log(`getallprod contro ${getProducts}`);

    if (q === '') {
      return res.status(200).json(getProducts);
    }

    const product = await productsService.search(q);

    console.log(`prod cont ${product}`);

    if (!product) {
      return res.status(404).json({ message: NOT_FOUND });
    }
    
    res.status(200).json(product);
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
  search,
};
