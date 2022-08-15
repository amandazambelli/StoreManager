const connection = require('./connection');

const getAll = async () => {
  const [productsData] = await connection.execute('SELECT * FROM StoreManager.products');

  return productsData;
};

const getById = async (id) => {
  const [productData] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  if (productData === 0) return null;

  return productData[0];
};

const create = async ({ name }) => {
  const [productData] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );

  return { id: productData.insertId, name };
};

const update = async ({ id, name }) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [id, name],
  );

  return { id, name };
};

const deleted = async (id) => {
  await connection.execute(
   'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return id;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleted,
};
