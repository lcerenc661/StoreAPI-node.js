const express = require('express');
const ProductsService = require('../services/productsService.js');
const validatorHandler = require('../middlewares/validatorHandler.js');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../schemas/productSchema.js');

const router = express.Router();
const service = new ProductsService();

// GET METHOD (LIST)
router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/filter', (req, res) => {
  res.send('I am a filter');
});

// GET METHOD  {id}
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({
          message: 'Not Found',
        });
      }
    } catch (error) {
      next(error);
    }
  },
);

// ========================================================================>>

// POST METHOD

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const product = await service.create(body);
    res.status(201).json({
      message: 'created',
      data: product,
    });
  },
);

module.exports = router;

// ========================================================================>>

// PUT/PATCH METHOD

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({
        message: 'updated',
        product_id: id,
        data: product,
      });
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({
        message: 'updated',
        product_id: id,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },
);

// ========================================================================>>

// Delete METHOD

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const product = await service.delete(id);
    res.json({
      message: 'deleted',
      product_id: product,
    });
  },
);
