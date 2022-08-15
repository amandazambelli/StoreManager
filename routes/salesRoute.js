const express = require('express');
const salesController = require('../controllers/salesController');

const route = express.Router();

route.get('/', salesController.getAll);
route.get('/:id', salesController.getById);
route.delete('/:id', salesController.deleted);

module.exports = route;
