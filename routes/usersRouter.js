const express = require('express');
const UserService = require('../services/userService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createUsersSchema,
  updateUsersSchema,
  getUsersSchema,
} = require('../schemas/usersSchema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUsersSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createUsersSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const user = await service.create(data);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(getUsersSchema, 'params'),
  validatorHandler(updateUsersSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', validatorHandler(getUsersSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const responseData = await service.delete(id)
    res.json(responseData)
  } catch (error){
    next(error);
  }
})

module.exports = router;
