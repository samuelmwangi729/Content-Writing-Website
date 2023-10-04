const {Router} = require('express')
const {checkAuth,getUser} = require('../Middlewares/AuthMiddleware')
const {Index,createBid,SaveBid,TakeProject,ProjectsPayments,getTakenProjects,GetProjectDetails,DepositProject,getCallBackData,RedirectAfterCallback} = require('../Controller/ProjectsControllers')
const ProjectRoutes = Router()
//then create the routes here from the projects controllers 
//create projects bids 

ProjectRoutes.get('/BidProject',checkAuth,getUser,createBid)
.get('/Projects',getUser,checkAuth,Index)
.get('/Payments/Projects',getUser,checkAuth,ProjectsPayments)
.get('/Deposit',getUser,checkAuth,DepositProject)
.post('/ProjectBid',getUser,checkAuth,SaveBid)
.post('/TakeProject',getUser,checkAuth,TakeProject)
.post('/CallBack',getCallBackData)
.get('/CallBack',RedirectAfterCallback)
.get('/Taken/Projects',getUser,checkAuth,getTakenProjects)
.post('/getProjectDetails',getUser,checkAuth,GetProjectDetails)

module.exports = ProjectRoutes