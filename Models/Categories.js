const mongoose = require('mongoose')
const User = require('./Users')
const CategoriesSchema = mongoose.Schema({
    CategoryName:{
        type:String,
        required:[true,'The Category Name Is Required']
    },
    CategoryType:{
        type:String,
        enum:['Blog','Content','Skills','Others'],
        default:'Content'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:[true,'The user is required']
    }
},{timestamps:true})
//compile the schema into models
const Categories = mongoose.model('Categories',CategoriesSchema)

module.exports=Categories