const express = require('express')
const {checkAuth,getUser} = require('../Middlewares/AuthMiddleware')
//import the controller 
const {Index,AddCategory,All,EditItem,UpdateCategory}  = require('../Controller/CategoryController')
const catRouter = express.Router()
catRouter.get("/CategoryCreate",checkAuth,Index)
.get("/CategoryAll",checkAuth,getUser,All)
.get("/EditCategory",checkAuth,EditItem)
.post("/Categories/Add",checkAuth,getUser,AddCategory)
.post("/Categories/Update",checkAuth,getUser,UpdateCategory)
module.exports=catRouter