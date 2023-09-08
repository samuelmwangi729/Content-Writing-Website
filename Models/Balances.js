const { Schema,model } = require("mongoose");
const User = require('./Users')

const BalanceSchema = new Schema({
    UserID :{
        type:Schema.Types.ObjectId,
        ref:User,
        required:[true,'User id is Required']
    },
    Balance :{
        type:Amount,
        default:0
    }
},{timestamps:true})

const Balances = model('Balances',BalanceSchema)
module.exports = Balances