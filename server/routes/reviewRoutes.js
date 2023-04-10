const express = require('express')
const review_routes = express()
const {  upload, fileUpload} = require('../middleware/UploadSingleFile')
const reviewController = require('../controllers/reviewController')
const userAuthentication = require('../middleware/userAuthentication')


review_routes.put('/add-review',userAuthentication,upload.single("img") ,fileUpload,reviewController.addReview )
review_routes.put('/helpfull',userAuthentication,reviewController.helpFull)

module.exports = review_routes;