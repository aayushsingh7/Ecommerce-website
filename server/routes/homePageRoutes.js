const express = require('express')
const homePage_routes = express()
const homePageController = require('../controllers/homePageController')

homePage_routes.post('/add', homePageController.addData)
homePage_routes.get('/getData',homePageController.getData)

module.exports = homePage_routes