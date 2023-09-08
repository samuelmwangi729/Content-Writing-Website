const mongoose = require('mongoose')
const User = require('./Users')
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
        type:String,
        enum:['Active','Suspended','Pending'],
        default:'Pending'
    },
    Author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:[true,'The author is required']
    }
})
//compile the schema into models
const Blog = mongoose.model('Blog',BlogSchema)
module.exports =Blog