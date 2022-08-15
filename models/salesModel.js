const connection = require('./connection');

const getAll = async () => {
  const [salesData] = await connection.execute(
    `SELECT sp.sale_id, sal.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS sal
    ON sal.id = sp.sale_id
    ORDER BY sale_id, product_id`,
  );

  if (salesData === 0) return null;

  const salesGetAll = salesData.map((prods) => ({
      saleId: prods.sale_id,
      date: prods.date,
      productId: prods.product_id,
      quantity: prods.quantity,
  }));

  return salesGetAll;
};

const getById = async (id) => {
  const [salesData] = await connection.execute(
    `SELECT sp.sale_id, sal.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    JOIN StoreManager.sales AS sal
    ON sal.id = sp.sale_id
    WHERE sale_id = ?`,
    [id],
  );

  if (salesData === 0) return null;

  const salesGetById = salesData.map((sales) => ({
    saleId: sales.sale_id,
    date: sales.date,
    productId: sales.product_id,
    quantity: sales.quantity,
  }));

  return salesGetById;
};

module.exports = { getAll, getById };
