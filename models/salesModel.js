const connection = require('./connection');

const getAll = async () => 
  /* const [salesData] = await connection.execute(
    'SELECT
        sp.sale_id AS `saleId`,
        sal.`date` AS `date`,
        sp.product_id AS `productId`,
        sp.quantity AS `quantity`
      FROM StoreManager.sales_products AS sp
      JOIN StoreManager.sales AS sal
      ON sal.id = sp.sale_id
      ORDER BY sale_id, product_id',
  ); */

   salesData;
const getById = async (id) => {
  const [salesData] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );

  if (salesData === 0) return null;

  // const { sale_id: saleId, product_id: productId, quantity } = salesData;

  return salesData;
};

module.exports = {
  getAll,
  getById,
};
