const token = require('jsonwebtoken')
const userModel = require('../Models/Users')

const checkAuth = (req,res,next)=>{
    //first check if the token exists
    const uToken = req.cookies.jwt
    //confirm if the token is there 
    if(req.cookies.jwt){
        //then verify the token
        token.verify(uToken,'P!@#four5sam',(err,dToken)=>{
            if(err){
                //then the token is not valid
                res.redirect("/")
            }else{
                //the token is valid 
                next()
            }
        })
    }else{
        res.redirect('/Login')
    }
}
getUser = async (req,res,next)=>{
    //get the user from the json token 
    const uToken = req.cookies.jwt
    //confirm if the token is there 
    if(req.cookies.jwt){
        //then verify the token
         token.verify(uToken,'P!@#four5sam',async (err,dToken)=>{
            if(err){
                res.locals.user=null
                next()
            }else{
                //get the user from the token
                const userId = dToken.uniqueKey
                //find the user from the database 
                const sysUser = await userModel.findById(userId)
                const user={
                    firstName:sysUser.firstName,
                    lastName:sysUser.lastName,
                    email:sysUser.email,
                    regReason:sysUser.regReason,
                    isStaff:sysUser.isStaff,
                    isAdmin:sysUser.isAdmin,
                    userLevel:sysUser.useLevel,
                    userStatus:sysUser.userStatus
                }
                res.locals.user = user
                //the token is valid 
                next()
            }
        })
   }else{
    res.locals.user=null;
    next()
   }
}
module.exports = {checkAuth,getUser}