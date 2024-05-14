const express = require('express')
const { index, create, destroy, update, show } = require('../controllers/product.controller')
const { verifyToken } = require('../middleware/auth.middleware')
const { validateCreateProduct, validateUpdateProduct } = require('../middleware/productValidator.middleware')
const router = express.Router()

router.get('/products', verifyToken, index)
router.get('/products/:id', verifyToken, show)
router.post('/products', verifyToken, validateCreateProduct, create)
router.patch('/products/:id', verifyToken, validateUpdateProduct, update)
router.delete('/products/:id', verifyToken, destroy)

module.exports = router