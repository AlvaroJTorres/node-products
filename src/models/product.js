'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    handle: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    sku: DataTypes.STRING,
    grams: DataTypes.DOUBLE,
    stock: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    compare_price: DataTypes.DOUBLE,
    barcode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};