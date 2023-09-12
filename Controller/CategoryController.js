//all the controlling will be done here 
const Category =  require('../Models/Categories')
const getUser = require('../Utils/getUser')
const Index = (req,res)=>{
    res.render('Backend/Category/Index.ejs',{title:'Create Category'})
}
const AddCategory = async (req,res)=>{
    let errors = {}
    //save the categories to the database 
    const {catName,CategoryType} = req.body
    const userLoggedIn = res.locals.user.email
    try {
        const category = await Category.create({
            // CategoryName:catName,
            // CategoryType:CategoryType,
            // createdBy:''
        })
    } catch (e) {
        if(e.message.includes('validation failed')){
           console.log(e.errors)
        }else{
            console.log(e)
        }
    }
    res.json({errors})
}
module.exports = {Index,AddCategory}