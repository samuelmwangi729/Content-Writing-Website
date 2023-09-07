const mongoose = require('mongoose')
const Categories = require('./Categories')
const BlogSchema = mongoose.Schema({
    //then the blogs should follow here 
    title:{
        type:String,
        required:[true,'Blog title Is required']
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Categories,
        required:[true,'The Blog Category Is required']
    },
    Image:{
        type:String,
        default:''
    },
    Content:{
        type:String,
        required:[true,'Content Is required']
    },
    BlogStatus:{
        enum:['Active','Suspended','Pending'],
        default:'Pending'
    }
})