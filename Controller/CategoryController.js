//all the controlling will be done here 
const Category =  require('../Models/Categories')
const getUser = require('../Utils/getUser')
const User = require('../Models/Users')
const Index = (req,res)=>{
    res.render('Backend/Category/Index.ejs',{title:'Create Category'})
}
const AddCategory = async (req,res)=>{
    let errors = {error:'Could Not Create the Category'}
    let success = {success:'Category Successfully Created'}
    //save the categories to the database 
    const {catName,CategoryType} = req.body
    const userLoggedIn = await User.getUID(res.locals.user.email)
    try {
        const category = await Category.create({
            CategoryName:catName,
            CategoryType:CategoryType,
            createdBy:userLoggedIn
        })
        if(category){
            //then its created
            res.json({success})
        }
    } catch (e) {
        res.json({errors})
    }
}
module.exports = {Index,AddCategory}