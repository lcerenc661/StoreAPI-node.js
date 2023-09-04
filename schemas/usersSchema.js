const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

const createUsersSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUsersSchema = Joi.object({
  email: email,
  role: role,
  password: password,
});

const getUsersSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUsersSchema, updateUsersSchema, getUsersSchema };
