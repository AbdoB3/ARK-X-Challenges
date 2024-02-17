const express = require('express')

const router = express.Router()

const { getProduct, getProductById, getProductSearch, createProduct, updateProduct, deleteProduct } = require('../controllers/productsController')


// Middleware 1: Logging middleware


router.get('/', getProduct)

router.get('/search', getProductSearch)


router.get('/:id', getProductById)


router.post('/', createProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)


module.exports = router;