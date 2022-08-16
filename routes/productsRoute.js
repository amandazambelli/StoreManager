const express = require('express');
const productsController = require('../controllers/productsController');

const nameIsValid = require('../middlewares/productsValidation');

const route = express.Router();

route.get('/', productsController.getAll);
route.get('/:id', productsController.getById);
route.post('/', nameIsValid, productsController.create);
route.put('/:id', nameIsValid, productsController.update);
route.delete('/:id', productsController.deleted);
route.get('/search', productsController.search);

module.exports = route;
