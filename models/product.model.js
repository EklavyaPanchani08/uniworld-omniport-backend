const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discountPrice: DataTypes.FLOAT,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  module.exports = Product;
