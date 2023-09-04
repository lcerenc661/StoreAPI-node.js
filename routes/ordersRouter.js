const express = require('express');
const OrdersService = require('../services/ordersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createOrderSchema,
  getOrderSchema,
  updateOrderSchema,
  addItemSchema,
} = require('../schemas/orderSchema');

const router = express.Router();
const service = new OrdersService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const order = await service.create(data);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/addItem',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const order = await service.addItem( data);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const order = await service.update(id, data);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const responseData = await service.delete(id);
      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
