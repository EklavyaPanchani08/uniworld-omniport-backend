const dotenv = require("dotenv");
dotenv.config();

const Category = require("./category.model");
const Product = require("./product.model");
const Customer = require("./customer.model");
const Order = require("./order.model");
const OrderItem = require("./orderItem.model");

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });
Customer.hasMany(Order, { foreignKey: "customerId" });
Order.belongsTo(Customer, { foreignKey: "customerId" });
Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });
Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

module.exports = {
  Category,
  Product,
  Customer,
  OrderItem,
  Order,
};
