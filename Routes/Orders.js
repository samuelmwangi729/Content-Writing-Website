const express = require('express')
const fileUpload = require('express-fileupload')
//instantiate the express router 
const orderRouter = express.Router()
//import the middleware 
const {checkAuth,getUser} = require('../Middlewares/AuthMiddleware')
//import the controllers 
const {Index,SaveOrder,MyOrders} =  require('../Controller/OrderController')
orderRouter.get("/OrderCreate",getUser,Index)
.get("/MyOrders",checkAuth,getUser,MyOrders)
orderRouter.post("/SaveOrder",fileUpload({createParentPath:true}),checkAuth,getUser,SaveOrder)
module.exports = orderRouter