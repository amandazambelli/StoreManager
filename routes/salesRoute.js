const express = require('express');
const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesValidation');

const route = express.Router();

route.get('/', salesController.getAll);
route.get('/:id', salesController.getById);
route.post('/', salesValidation.saleIsValid,
  salesValidation.productValidation, salesController.create);
route.delete('/:id', salesController.deleted);

module.exports = route;
