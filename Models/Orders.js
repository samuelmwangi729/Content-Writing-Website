const {Schema,model } = require("mongoose");
const User = require('./Users')
const Categories = require('./Categories')
const OrderSchema = new Schema({
    Title:{
        type:String,
        required:[true,'The title is required'],
    },
    Category:{
        type:Schema.Types.ObjectId,
        ref:Categories,
        required:[true,'The category is required'],
    },
    Description:{
        type:String,
        required:[true,'The Description is required'],
    },
    ProjectFile:{
        type:Array,
        default:''
    },
    Budget:{
        type:Number,
        default:''
    },
    Status:{
        type:String,
        enum:['Online','Hold','Awarded','Pending','Complete','Deleted','Suspended','Revise','Withdrawn'],
        default:'Pending'
    },
    Client:{
        type:Schema.Types.ObjectId,
        ref:User
    },
    AwardedTo:{
        type:String,
        default:''
    },
    ProjectType:{
        type:String,
        enum:['Contract','Hourly'],
        default:'Contract'
    },
    HourRate:{
        //if the project is hourly, you can set the rate here
        type:Number,
        default:0
    },
    Proposals:{
        type:Number,
        default:4
    },
    Bids:{
        type:Number,
        default:0
    },
    SubmitBy:{
        type:Date,
    }
},{timestamps:true})
OrderSchema.statics.isExists = async  (orderID,userEmail)=>{
    //import the user model 
    //confirm if the order exists in the database 
    const user = await User.findOne({email:userEmail})
    const order = await Orders.findOne({_id:orderID,Client:user})
    if(order){
        //return true because the order exist 
        return true
    }else{
        return false
    }
}
OrderSchema.statics.getProject = async  (orderID)=>{
    //import the user model 
    //confirm if the order exists in the database 
    const order = await Orders.findOne({_id:orderID})
    if(order){
        return true
    }else{
        return false
    }
}

const Orders = model('Orders',OrderSchema)
//export the model
module.exports = Orders