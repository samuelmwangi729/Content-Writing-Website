const {Schema,model} = require('mongoose')
const User = require('./Users')
const CategoriesSchema = new Schema({
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
        type:Schema.Types.ObjectId,
        ref:User,
        required:[true,'The user is required']
    }
},{timestamps:true})
CategoriesSchema.statics.getID = async (id)=>{
    return id.toString().split("\"")[0]
}
//compile the schema into models
const Categories = model('Categories',CategoriesSchema)

module.exports=Categories