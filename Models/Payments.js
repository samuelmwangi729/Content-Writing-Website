const { Schema ,model } = require("mongoose");
const User = require('./Users')
const Order = require('./Orders')

const PaymentSchema = Schema({
    CliendID :{
        type:Schema.Types.ObjectId,
        ref:User,
        required:[true,'The client Id Is required']
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
    OrderID:{
        type:Schema.Types.ObjectId,
        ref:Order,
        required:[true,'Order Id Is required']
    },
    PaymentStatus:{
        type:String,
        enum:['Successful','Error'],
        default:'Successful'
    }
},{timestamps:true})

const Payments = model('Payments',PaymentSchema)
module.exports = Payments