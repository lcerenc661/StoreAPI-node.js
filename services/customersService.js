const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const customer = await models.Customer.create(data);
    return customer;
  }
  async createWithUser(data) {
    const customer = await models.Customer.create(data, {
      include: ['user'],
    });
    return customer;
  }
  async find() {
    const customers = await models.Customer.findAll({
      include: ['user'],
    });
    return customers;
  }
  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      boom.notFound('Customer not found');
    }
    return customer;
  }
  async update(id, data) {
    const customer = await this.findOne(id);
    const response = await customer.update(data);
    return response;
  }
  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
