const { UserSchema, User } = require('./userModel');
const { CustomerSchema, Customer } = require('./customerModel');
const { ProductSchema, Product } = require('./productModel');
const { CategorySchema, Category } = require('./categoryModel');
const { OrderSchema, Order } = require('./orderModel');
const { OrderProductSchema, OrderProduct } = require('./order-products');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));


  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
