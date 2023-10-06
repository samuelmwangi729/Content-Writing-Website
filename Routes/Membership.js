const {Router} = require('express')
const MembersRouter = Router()
const {checkAuth,getUser} = require('../Middlewares/AuthMiddleware')
const {Index,AddMembership,DeleteMembership,getProjectDetails} = require('../Controller/MembershipController')
MembersRouter.get('/Memberships',checkAuth,getUser,Index)
.post("/Post/Membership/Benefits",checkAuth,getUser,AddMembership)
.post("/Delete/Membership",checkAuth,getUser,DeleteMembership)
.post("/Get/Details",checkAuth,getUser, getProjectDetails)
module.exports = MembersRouter