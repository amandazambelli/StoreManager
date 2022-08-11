const salesModel = require('../models/salesModel');

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale) return null;

  return sale;
};

module.exports = {
  getAll,
  getById,
};