const db = require('../models/index');
var XLSX = require("xlsx");

const index = async (req, res) => {
  try {
    const products = await db.Product.findAll()
    return res.status(200).json(products)
  } catch (err) {
    return res.status(500).json({ message: 'Error on index of products'});
  }
}

const show = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await db.Product.findOne({where: {id:productId}})
    if(!product) {
      return res.status(404).json({message: 'Product not found'})
    }
    return res.json(product)
  } catch (err) {
    return res.status(500).json({message:'Failed to fetch product'})
  }
}

const create = async (req, res) => {
  try {
    const { handle, title, description, sku, grams, stock, price, compare_price, barcode } = req.body

    const productBySkuExists = await db.Product.findOne({where: {sku}})
    if(productBySkuExists) {
      return res.status(400).json({message: 'SKU already used for a different product'})
    }
    const htmlDescription = '<p><strong>Características:</strong></p>\r\n<ul>\r\n'
    const formatedDescriptionList = description.split(' ').map((el) => `<li>${el}</li>\r\n`).join('').concat('</ul>')
    const formatedDescription = htmlDescription.concat(formatedDescriptionList)

    const newProduct = await db.Product.create({handle, title, description: formatedDescription, sku, grams, stock, price, compare_price, barcode})
    
    return res.status(201).json(newProduct)
  } catch (err) {
    return res.status(500).json({message:'Failed to create product'})
  }
}

const update = async (req, res) => {
  try {
    const productId = req.params.id
    const { handle, title, description, sku, grams, stock, price, compare_price, barcode } = req.body

    const product = await db.Product.findOne({where: {id:productId}})
    if (!product) {
        return res.status(404).json({message:'Product not found'});
    }

    if(description) {
      const htmlDescription = '<p><strong>Características:</strong></p><ul>'
      const formatedDescriptionList = description.split(' ').map((el) => `<li>${el}</li>`).join('')
      const formatedDescription = htmlDescription.concat(formatedDescriptionList).concat('</ul>')
      product.description = formatedDescription
      await product.save()
    }

    const updatedProduct = await product.update({handle, title, sku, grams, stock, price, compare_price, barcode})
    
    return res.status(201).json(updatedProduct)
  } catch (err) {
    return res.status(500).json({message:'Failed to updated product'})
  }
}

const destroy = async (req, res) => {
  try {
    const productId = req.params.id
    const deletedProductCount = await db.Product.destroy({where: {id: productId}})
    if(deletedProductCount === 0) {
      return res.status(404).json({message: 'Product not found'})
    }
    return res.json({message: `Product with id ${productId} deleted successfuly`})
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete product' });
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}