const { Schema,Model } = require("mongoose");
const User = require('./Users')
const WithdrawSchema = Schema({
    UserID:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:[true,'The User Id is required']
    },
    Amount:{
        type:Number,
        required:[true,'The amount is required']
    },
    Platform:{
        type:String,
        enum:['Paypal','Skrill','M-Pesa']
    },
    PaymentAddress:{
        type:String,
        required:[true,'The Payment Address is required']
    },
    Status:{
        type:String,
        enum:['Approved','Successful','Pending'],
        default:'Pending'
    }
},{timestamps:true})
//compile the exports here 
const Withdrawal = model('Withdrawal',WithdrawSchema)
module.exports = Withdrawal