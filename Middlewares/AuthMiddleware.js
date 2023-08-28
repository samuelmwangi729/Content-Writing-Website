const token = require('jsonwebtoken')

const checkAuth = (req,res,next)=>{
    //first check if the token exists
    const uToken = req.cookie.jwt
    console.log(req.cookie)
    //confirm if the token is there 
    if(req.cookie.jwt){
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

module.exports = {checkAuth}