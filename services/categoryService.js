const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class CategoryService {
  constructor() {}

  async create(data) {
    const newCategory = await models.Category.create(data, {
      include: ['products'],
    });
    return newCategory;
  }

  async find() {
    const response = await models.Category.findAll({
      include: ['products'],
    });
    return response;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const response = await category.update(changes);
    return response;
  }
  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;
