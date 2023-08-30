const express = require('express')
const productsRouter = require('./productsRouter.js');
const categoriesRouter = require('./categoriesRouter.js')
const usersRouter = require('./usersRouter.js')

function routerApi(app) {
  const router = express.Router()
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  app.use('/api/v1', router);
}

module.exports = routerApi;
