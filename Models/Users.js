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
    isStaff:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    useLevel:{
        type:Number,
        default:0
    },
    userStatus:{
        type:Number,
        required:true,
        default:1
    },
},{timestamps:true})
userSchema.statics.cleanInput= async (item)=>{
    //clean the input here
    const cleanItem = escape(item)
    return cleanItem
}
//hash the password and store to the database
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})
const userModel = mongoose.model('userModel',userSchema)
module.exports = userModel