const express = require('express');
const CustomerService = require('../services/customersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createCustomerSchema,
  createCustomerAndUSerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customerSchema');

const router = express.Router();
const service = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const customer = await service.create(data);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/withUser',
  validatorHandler(createCustomerAndUSerSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const customer = await service.createWithUser(data);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const customer = await service.update(id, data);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
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
