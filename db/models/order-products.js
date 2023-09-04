const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./orderModel');
const { PRODUCT_TABLE } = require('./productModel');

const ORDER_PRODUCTS_TABLE = 'order_products';
const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class OrderProduct extends Model {
  static associate() {
    // associate
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCTS_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}

module.exports = { ORDER_PRODUCTS_TABLE, OrderProductSchema, OrderProduct };
