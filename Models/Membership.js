const { Schema ,model} = require("mongoose");
const User = require('./Users')
const MembershipSchema =  new Schema({
    Title:{
        type:String,
        required:[true,'The title is Required'],
        unique:[true,'Unique title is required']
    },
    Benefits:{
        type:Array,
        required:true,
        default:[]
    },
    SubscriptionFees:{
        type:Number,
        default:0
    },
    Status:{
        type:String,
        enum:['Active','On Hold','Suspended'],
        default:'Active'
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:User
    },
    updatedBy:{
        type:Schema.Types.ObjectId,
        ref:User
    },
},{timestamps:true})
const Membership = model('Membership',MembershipSchema)
//create the membership takes and bids 
const MembersTakesBidSchema = new Schema({
    Title:{
        type:Schema.Types.ObjectId,
        ref:Membership,
        default:'Basic'
    },
    Takes:{
        type:Number,
        default:0
    },
    Bids:{
        type:Number,
        default:20
    },
    //they renew after 1 month automatically
    RenewsAfter:{
        type:Number,
        default:1
    }
},{timestamps:true})
//create where you will be monitoring user's bids and takes 
const userMembershipTrackerSchema = new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        ref:User
    },
    membershipID:{
        type:Schema.Types.ObjectId,
        ref:Membership,
        default:'Basic'
    },
    Takes:{
        type:Number,
        default:0
    },
    Bids:{
        type:Number,
        default:0
    }
})
//compile to models 
const MembersTakesBid = model('MembersTakesBids',MembersTakesBidSchema)
const userMembershipTracker = model('userMembershipTracker',userMembershipTrackerSchema)
module.exports = {Membership,MembersTakesBid,userMembershipTracker}