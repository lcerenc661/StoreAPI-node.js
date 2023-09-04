const express = require('express');
const productsRouter = require('./productsRouter.js');
const categoriesRouter = require('./categoriesRouter.js');
const usersRouter = require('./usersRouter.js');
const customersRouter = require('./customersRouter.js');
const ordersRouter = require('./ordersRouter.js');

function routerApi(app) {
  const router = express.Router();
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  app.use('/api/v1', router);
}

module.exports = routerApi;
