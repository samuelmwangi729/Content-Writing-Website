const express = require('express')
const {checkAuth,getUser} = require('../Middlewares/AuthMiddleware')
//import the controller 
const {Index,AddCategory}  = require('../Controller/CategoryController')
const catRouter = express.Router()
catRouter.get("/CategoryCreate",checkAuth,Index)
.post("/Categories/Add",checkAuth,getUser,AddCategory)
module.exports=catRouter