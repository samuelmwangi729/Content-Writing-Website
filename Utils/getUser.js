const User = require('../Models/Users')
const token = require('jsonwebtoken')
getUser = async (req,res,next)=>{
    //get the user from the json token 
    const uToken = req.cookies.jwt
    //confirm if the token is there 
    if(uToken){
        //then verify the token
         token.verify(uToken,'P!@#four5sam',async (err,dToken)=>{
            if(err){
                return null;
            }else{
                //get the user from the token
                const userId = dToken.uniqueKey
                //find the user from the database 
                const sysUser = await User.findById(userId)
                const user={
                    firstName:sysUser?.firstName,
                    lastName:sysUser?.lastName,
                    email:sysUser?.email,
                    regReason:sysUser?.regReason,
                    isStaff:sysUser?.isStaff,
                    isAdmin:sysUser?.isAdmin,
                    userLevel:sysUser?.useLevel,
                    userStatus:sysUser?.userStatus
                }
                return sysUser?._id
            }
        })
   }else{
    return null
   }
}

module.exports = getUser