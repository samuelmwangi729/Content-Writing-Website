const Category = require('../Models/Categories')
const Index = async (req,res)=>{
    //filter out the categories that use orders only 
    categories = await Category.find({CategoryType:'Content'})
    res.render('Backend/Orders/Index.ejs',{title:'Orders Index Page',categories:categories})
}

module.exports = {Index}