const express = require('express');
const CategoryService = require('../services/categoryService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createCategorieSchema,
  updateCategorieSchema,
  getCategorieSchema,
} = require('../schemas/categorySchema');

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCategorieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createCategorieSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const category = await service.create(data);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(getCategorieSchema, 'params'),
  validatorHandler(updateCategorieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getCategorieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const responseData = await service.delete(id);
      res.json(responseData);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
