const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  const sales = await salesService.getAll();

  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
};

module.exports = {
  getAll,
  getById,
};