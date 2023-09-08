const mongoose = require('mongoose')
const {isEmail,escape} = require('validator')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'The First Name is Required'],
    },
    lastName:{
        type:String,
        required:[true,'The Last is Required'],
    },
    email:{
        type:String,
        required:[true,'The Email is Required'],
        lowercase:true,
        unique:true,
        validate:[(val)=>{
            isEmail
        },'Please Enter a Valid Email']
    },
    regReason:{
        type:String,
        default:'hire'
    },
    password:{
        type:String,
        required:[true,'Minimum length is 8'],
        minlength:[8,'The minimum length is 8 characters']
    },
    useLevel:{
        type:String,
        enum:['user','Staff'],
        default:'user'
    },
    accountStatus:{
        type:String,
        enum:['Active','Dormant','Unverified'],
        required:true,
        default:'Unverified'
    },
    userRole:{
        type:String,
        enum:['Client','Writer','Administrator'],
        default:'Client'
    }
},{timestamps:true})
userSchema.statics.cleanInput= async (item)=>{
    const cleanItem = escape(item)
    return cleanItem
}
userSchema.statics.Login= async (username,password)=>{
    const user = await userModel.findOne({email:username})
    if(user){
        const passMatch =  await bcrypt.compare(password,user.password)
        if(passMatch){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}
userSchema.statics.getUID = async (username)=>{
    const user = await userModel.findOne({email:username})
        const splittedString = (user._id).toString().split("\"")
        let userId=splittedString[0]
    return userId
}
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})
const User = mongoose.model('userModel',userSchema)
module.exports = User