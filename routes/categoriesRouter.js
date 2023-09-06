const express = require('express');
const passport = require('passport');
const { checkRoles } = require('../middlewares/authHandler');
//const { checkAdminRole } = require('../middlewares/authHandler');

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
  passport.authenticate('jwt', { session: false }),
  checkRoles(['admin', 'seller', 'customer']),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(createCategorieSchema, 'body'),
  async (req, res, next) => {
    try {
      console.log(req.user);
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
