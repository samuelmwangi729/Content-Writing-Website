const { Schema , model } = require("mongoose");
const Order = require('./Orders')
const User = require('./Users')

const SubmisionSchema = new Schema({
    OrderID:{
        type:Schema.Types.ObjectId,
        ref:Order,
        required:[true,'The Order Id is required']
    },
    SubmissionFile:{
        type:String,
        default:''
    },
    SubmittedBy:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:[true,'The user is required']
    },
    Status:{
        type:String,
        enum:['Accepted','Revise']
    }
},{timestamps:true})

const Submission = model('Submission',SubmisionSchema)

module.exports = Submission