const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    const response = await models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
      offset: 0,
      limit: 3,
    });
    return response;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!order) {
      boom.notFound('Order not found');
    }
    return order;
  }
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const response = await order.update(changes);
    return response;
  }
  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}

module.exports = OrderService;
