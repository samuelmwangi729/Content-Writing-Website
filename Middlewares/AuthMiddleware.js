const token = require('jsonwebtoken')
const userModel = require('../Models/Users')
const moment = require('moment')
const countdown = require('moment-countdown');
const url =  require('url')

const checkAuth = (req,res,next)=>{
    res.locals.moment = moment
res.locals.countdown = countdown
    //first check if the token exists
    const uToken = req.cookies.jwt
   
    //confirm if the token is there 
    if(req.cookies.jwt){
        //then verify the token
        token.verify(uToken,'',(err,dToken)=>{
            if(err){
                //then the token is not valid
                //if there is a path , redirect to the path 
                //else to dashboard 
                res.redirect("/")
            }else{
                next()
                //the token is valid 
            }
        })
    }else{
        const {path} = url.parse(req.url,true)
        res.locals.path = path
        res.cookie('path',path,{httpOnly:true,maxAge:1*24*60*60*1000})
        console.log(req.cookies.path)
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
                    userId:sysUser?._id,
                    firstName:sysUser.firstName,
                    lastName:sysUser.lastName,
                    email:sysUser.email,
                    regReason:sysUser.regReason,
                    isStaff:sysUser.isStaff,
                    isAdmin:sysUser.isAdmin,
                    userLevel:sysUser.useLevel,
                    userStatus:sysUser.userStatus,
                    membership:'Gold'
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
