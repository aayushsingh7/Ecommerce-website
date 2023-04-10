const express = require('express');
const product_routes = express()
const { upload ,   fileUploads} = require('../middleware/uploadFiles');
const productController = require('../controllers/productController')

// product_routes.post('/add-item',upload.array('images'),fileUploads,productController.addProduct)
product_routes.post('/add-item',productController.addProduct)
product_routes.get('/all-product',productController.getAllProduct)
product_routes.get('/single-product/:productId',productController.getSingleProduct)
product_routes.get('/search',productController.searchProduct)
product_routes.put('/update-review',productController.updateAvgReview)

module.exports= product_routes;