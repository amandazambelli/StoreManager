const connection = require('./connection');

const getAll = async () => {
  const [salesData] = await connection.execute(
    `SELECT sp.sale_id AS saleId, sal.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS sal
    ON sal.id = sp.sale_id
    ORDER BY sale_id, product_id`,
  );

  if (salesData.length === 0) return null;

  return salesData;
};

const getById = async (id) => {
  const [salesData] = await connection.execute(
    `SELECT sal.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS sal
    ON sal.id = sp.sale_id
    WHERE sale_id = ?`,
    [id],
  );

  if (salesData.length === 0) return null;

  return salesData;
};

const createSales = async () => {
  const [productData] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );

  return productData.insertId;
};

const createSalesProduct = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return true;
};

const update = async (id, sales) => {
  await Promise.all(sales.map(
    async (sale) => connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?',
    [sale.quantity, sale.productId, id],
    ),
  ));

  return true;
};

const deleted = async (id) => {
  await connection.execute(
   'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  return id;
};
  
module.exports = {
  getAll,
  getById,
  createSales,
  createSalesProduct,
  update,
  deleted,
};
