const User = require('./Users')
const Order = require('./Orders')
const {Schema,model} = require('mongoose')

const BidSchema = new Schema({
    //then the types 
    ProjectID:{
        type:Schema.Types.ObjectId,
        ref:Order,
        required:[true,'The Project Id is required']
    },
    BidTitle:{
        type:String,
        required:[true,'The title is required'],
    },
    BidDescription:{
        type:String,
        required:[true,'The description is required']
    },
    BidAmount:{
        type:Number,
        required:[true,'The bid amount is required']
    },
    BidType:{
        type:String,
        enum:['Sealed','Highlighted','Sponsored','Basic'],
        default:'Basic'
    },
    BidStatus:{
        type:String,
        enum:['Dropped','Withdrawn','Accepted','Pending'],
        default:'Pending'
    },
    Freelancer:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:[true,'The user is required']
    }
},{timestamps:true})
const Bids = model('Bids',BidSchema)
//export the model 
module.exports = Bids