const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

const createCategorieSchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const updateCategorieSchema = Joi.object({
  name: name,
  image: image,
});

const getCategorieSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorieSchema,
  updateCategorieSchema,
  getCategorieSchema,
};
