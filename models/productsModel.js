const connection = require('./connection');

const getAll = async () => {
  const [productsData] = await connection.execute('SELECT * FROM StoreManager.products');

  return productsData;
};

const getById = async (id) => {
  const [productsData] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  if (productsData === 0) return null;

  return productsData[0];
};

module.exports = {
  getAll,
  getById,
};
