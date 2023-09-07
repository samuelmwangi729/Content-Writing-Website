const mongoose = require('mongoose')
const CategoriesSchema = mongoose.Schema({
    CategoryName:{
        type:String,
        required:[true,'The Category Name Is Required']
    },
    Icon:{
        type:String,
        required:[true,'The category Icon is Required']
    },
    CategoryType:{
        enum:['Blog','Content','Others'],
        default:'Content'
    }
},{timestamps:true})
//compile the schema into models
const Categories = mongoose.model('Categories',CategoriesSchema)

module.exports=Categories