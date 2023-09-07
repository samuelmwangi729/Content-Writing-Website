const mongoose = require('mongoose')
const User = require('./Users')
const LoginSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:User
    },
    ipAddress:{
        type:String,
        required:true,
    },
    range:{
        type:Array,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    timezone:{
        type:String,
        required:true
    },
    ll:{
        type:Array,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    platform:{
        type:String,
        required:true,
    },
},{timestamps:true})

const LoginLog = mongoose.model('LoginLog',LoginSchema)
module.exports = LoginLog
// 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
// account id 910954