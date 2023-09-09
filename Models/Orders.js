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
        type:String,
        default:''
    },
    Budget:{
        type:String,
        default:''
    },
    Status:{
        type:String,
        enum:['Online','Hold','Awarded','Pending','Complete','Deleted','Suspended','Revise'],
        default:'Online'
    },
    Client:{
        type:Schema.Types.ObjectId,
        ref:User
    },
    AwardedTo:{
        type:Schema.Types.ObjectId,
        ref:User
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
    SubmitBy:{
        type:Date,
    }
},{timestamps:true})

const Orders = model('Orders',OrderSchema)
//export the model
module.exports = Orders