const express = require('express')
const {checkAuth,getUser} = require('../Middlewares/AuthMiddleware')
//import the controller 
const {Index,AddCategory,All}  = require('../Controller/CategoryController')
const catRouter = express.Router()
catRouter.get("/CategoryCreate",checkAuth,Index)
.get("/CategoryAll",checkAuth,getUser,All)
.post("/Categories/Add",checkAuth,getUser,AddCategory)
module.exports=catRouter