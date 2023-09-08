const { Schema,model } = require("mongoose");
const Orders = require('./Orders')
const User = require('./Users')

const DisputeSchema = new Schema({
    OrderId:{
        type:Schema.Types.ObjectId,
        ref:Orders,
        required:[true,'The Order id is required']
    },
    DisputedBy:{
        type:Schema.Types.ObjectId,
        ref:User
    },
    Reason:{
        type:String,
        required:[true,'The reason is required']
    },
    DisputeActions:{
        type:String,
        enum:['Close','Hold','Escalate'],
        defaulf:'Hold'
    },
    Response:{
        type:String,
        default:''
    },
    ResponseByAdmin:{
        type:String,
        default:''
    },
    ResponseByStaff:{
        type:String,
        default:''
    }
},{timestamps:true})

const Disputes = model('Disputes',DisputeSchema)

module.exports = Disputes