const express = require('express')
//instantiate the express router 
const orderRouter = express.Router()
//import the middleware 
const checkAuth = require('../Middlewares/AuthMiddleware')
//import the controllers 
const {Index} =  require('../Controller/OrderController')
orderRouter.get("/OrderCreate",Index)
module.exports = orderRouter