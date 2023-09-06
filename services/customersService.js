const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {}

  async create(data) {
    const customer = await models.Customer.create(data);
    return customer;
  }
  async createWithUser(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const customer = await models.Customer.create(newData, {
      include: ['user'],
    });
    delete customer.dataValues.user.dataValues.password;
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
