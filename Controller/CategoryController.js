//all the controlling will be done here 
const Category =  require('../Models/Categories')
const url = require('url')
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
const UpdateCategory = async (req,res)=>{
    const {catID,catName,CategoryType} = req.body
    if(!CategoryType){
        res.json({errors:'Could Not Update the Category'})
    }else{
    //then check the categories from the database 
    const cat = await Category.findById(catID)
    //check if there is a category in the databse 
    if(cat){
        //then update the category 
        try {
            cat.CategoryName = catName,
            cat.CategoryType = CategoryType?CategoryType:CategoryType 
            cat.save()
            //send back the response to the browser
            res.json({success:'created Successfully'})
        } catch (error) {
            res.json({errors:'Could Not Update the Category'})
        }
    }else{
        res.json({errors:'Could Not Update the Category'})
    }
    }
}
//get all categories 
const All =  async (req,res)=>{
    //get all the categories from the database 
    const categories = await Category.find()
    //send the categories to the frontend 
    res.render('Backend/Category/All.ejs',{categories:categories})
}
const EditItem = async(req,res)=>{
    //get the url params
    let {query} = url.parse(req.url,true)
    //escape the query string 
    const itemId = query.itemId
    //get the category
    try {
        const cat = await Category.findById(itemId)
        if(cat){
            //get the category ID
            let categoryId = cat?._id.toString().split("\"")[0]
            res.render('Backend/Category/Edit.ejs',{categoryId,category:cat})
        }else{
            res.redirect('/CategoryAll')   
        }
    } catch (error) {
        //then the category is not found 
        res.redirect('/CategoryAll')
    }
}
module.exports = {Index,AddCategory,All,EditItem,UpdateCategory}