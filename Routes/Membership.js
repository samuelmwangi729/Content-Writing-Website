const {Router} = require('express')
const MembersRouter = Router()
const {checkAuth,getUser} = require('../Middlewares/AuthMiddleware')
const {Index,AddMembership} = require('../Controller/MembershipController')
MembersRouter.get('/Memberships',checkAuth,getUser,Index)
.post("/Post/Membership/Benefits",checkAuth,getUser,AddMembership)
module.exports = MembersRouter