const {check, validationResult} = require('express-validator');

const validateCreateProduct = [
  check('handle')
    .trim()
    .notEmpty()
    .withMessage('Product handle can not be empty!'),
  check('title')
    .trim()
    .notEmpty()
    .withMessage('Product title can not be empty!'),
  check('description')
    .trim()
    .notEmpty()
    .withMessage('Product description can not be empty!'),
  check('sku')
    .notEmpty()
    .withMessage('Product sku can not be empty!')
    .isLength({ min: 8, max: 12 }),
  check('grams')
    .notEmpty()
    .withMessage('Product grams can not be empty!')
    .isInt(),
  check('stock')
    .notEmpty()
    .withMessage('Product stock can not be empty!')
    .isInt(),
  check('price')
    .notEmpty()
    .withMessage('Product price can not be empty!')
    .isFloat(),
  check('compare_price')
    .notEmpty()
    .withMessage('Product compare_price can not be empty!')
    .isFloat(),
  check('barcode')
    .notEmpty()
    .withMessage('Product barcode can not be empty!')
    .isLength({ min: 8, max: 13 }),
  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
    next()
  }
]

const validateUpdateProduct = [
  check('handle')
  .trim(),
check('title')
  .trim(),
check('description')
  .trim(),
check('sku')
  .isLength({ min: 8, max: 12 }),
check('grams')
  .isInt(),
check('stock')
  .isInt(),
check('price')
  .isFloat(),
check('compare_price')
  .isFloat(),
check('barcode')
  .isLength({ min: 8, max: 13 }),
(req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
    next()
  }
]

module.exports = {
  validateCreateProduct,
  validateUpdateProduct
}