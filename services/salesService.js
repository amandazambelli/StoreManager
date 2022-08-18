const salesModel = require('../models/salesModel');

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale) return null;

  return sale;
};

const create = async (sales) => {
  const saleId = await salesModel.createSales();

  await Promise.all(sales.map(async (sale) =>
    salesModel.createSalesProduct(saleId, sale.productId, sale.quantity)));

  return { id: saleId, itemsSold: sales };
};

const update = async ({ id }, sales) => {
  const getSalebyId = await salesModel.getById(id);

  if (!getSalebyId) return null;

  await salesModel.update(id, sales);

  return { saleId: id, itemsUpdated: sales };
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
  create,
  update,
  deleted,
};