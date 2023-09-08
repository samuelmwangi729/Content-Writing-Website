const { Schema , model } = require("mongoose");
//import order and User
const User = require('./Users')
const Orders = require('./Orders')

const EarningSchema = new Schema({
    UserID:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:[true,'The User Id is required']
    },
    Amount:{
        type:Number,
    },
    ProjectID:{
        type:Schema.Types.ObjectId,
        ref:Orders
    },
    EarningDate:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        enum:['Successful','Reversed','Withdrawn']
    }
},{timestamps:true})
const Earnings = model('Earnings',EarningSchema)
module.exports = Earnings