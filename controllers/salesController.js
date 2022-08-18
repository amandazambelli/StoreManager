const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  const sales = await salesService.getAll();

  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getById(id);

  if (!sales) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(sales);
};

const create = async (req, res) => {
  const newSale = await salesService.create(req.body);

  res.status(201).json(newSale);
};

const update = async (req, res) => {
  const updateSale = await salesService.update(req.params, req.body);

  if (!updateSale) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(updateSale);
};

const deleted = async (req, res) => {
  const { id } = req.params;

  const sales = await salesService.deleted(id);

  if (!sales) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleted,
};
