const express = require('express');
const productsController = require('../controllers/productsController');

const route = express.Router();

route.get('/', productsController.getAll);
route.get('/:id', productsController.getById);
route.post('/', productsController.create);
route.put('/:id', productsController.update);
route.delete('/:id', productsController.deleted);

module.exports = route;
