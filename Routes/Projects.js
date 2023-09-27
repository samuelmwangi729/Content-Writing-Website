const {Router} = require('express')
const {checkAuth,getUser} = require('../Middlewares/AuthMiddleware')
const {Index,createBid,SaveBid,TakeProject} = require('../Controller/ProjectsControllers')
const ProjectRoutes = Router()
//then create the routes here from the projects controllers 
//create projects bids 

ProjectRoutes.get('/BidProject',checkAuth,getUser,createBid)
.get('/Projects',getUser,checkAuth,Index)
.post('/ProjectBid',getUser,checkAuth,SaveBid)
.post('/TakeProject',getUser,checkAuth,TakeProject)

module.exports = ProjectRoutes