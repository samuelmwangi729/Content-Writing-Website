const { Schema ,model} = require("mongoose");

const MembershipSchema =  new Schema({
    Title:{
        type:String,
        required:[true,'The title is Required']
    },
    Benefits:{
        type:Array,
        required:true,
        default:[]
    },
    SubscrptionFees:{
        type:Number,
        default:0
    },
    Status:{
        type:String,
        enum:['Active','On Hold','Suspended']
    }
},{timestamps:true})
//compile to models 
const Membership = model('Membership',MembershipSchema)
modules.exports = Membership