const { Schema ,model } = require("mongoose");
const User = require('./Users')
const Membership = require('./Membership')
const MembershipFeeSchema = Schema({
    UserID :{
        type:Schema.Types.ObjectId,
        ref:User,
        required:[true,'The User ID Is required']
    },
    PaymentPlatform:{
        type:String,
        enum:['Paypal','Credit Card'],
        default:'Paypal'
    },
    Amount:{
        type:Number,
        required:[true,'Amount is Required']
    },
    MembershipTypeID:{
        type:Schema.Types.ObjectId,
        ref:Membership,
        required:[true,'Membership Plan Is required']
    },
    PaymentStatus:{
        type:String,
        enum:['Successful','Error'],
        default:'Successful'
    }
},{timestamps:true})

const MembershipFee = model('MembershipFee',MembershipFeeSchema)
module.exports = MembershipFee