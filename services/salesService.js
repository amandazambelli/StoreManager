const salesModel = require('../models/salesModel');

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale) return null;

  return sale;
};

const deleted = async (id) => {
  const getSale = await salesModel.getById(id);

  if (!getSale) return null;

  const sale = await salesModel.deleted(id);

  return sale;
};

module.exports = {
  getAll,
  getById,
  deleted,
};