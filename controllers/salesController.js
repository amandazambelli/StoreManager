const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  const sales = await salesService.getAll();

  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesService.getById(id);

    if (!sales) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    const listSalesById = sales.map((sale) => ({
      date: sale.date,
      productId: sale.productId,
      quantity: sale.quantity,
    }));

    res.status(200).json(listSalesById);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
};

const deleted = async (req, res) => {
  try {
    const { id } = req.params;

    const sales = await salesService.deleted(id);

    if (!sales) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
};

module.exports = {
  getAll,
  getById,
  deleted,
};