const {Schema, model} = require('mongoose')
const User = require('./Users')
const ProfileSchema = new Schema({
    UserId:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:[true,'The user id must be submitted']
    },
    address:{
        type:String,
        required:[true,'Address must be provided']
    },
    Country:{
        type:String,
        required:[true,'Country must be provided']
    },
    Phone:{
        type:String,
        default:''
    },
    TwoFactorAuthentication:{
        type:String,
        enum:['Activated','Dormant'],
        default:'Dormant'
    },
},{timestamps:true}) 
//compile the schema to models 
const Profile = model('Profile',ProfileSchema)
module.exports = Profile