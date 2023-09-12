const express = require('express')
//instantiate the express router 
const orderRouter = express.Router()
const {getUser} = require('../Middlewares/AuthMiddleware')
//import the middleware 
const checkAuth = require('../Middlewares/AuthMiddleware')
//import the controllers 
const {Index} =  require('../Controller/OrderController')
orderRouter.get("/OrderCreate",getUser,Index)
module.exports = orderRouter