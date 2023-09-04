const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();

const email = Joi.string().email();
const password = Joi.string();
const role = Joi.string().min(5);

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  userId: userId.required(),
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
});

const createCustomerAndUSerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    role: role.required(),
  }),
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  createCustomerAndUSerSchema,
  updateCustomerSchema,
};
