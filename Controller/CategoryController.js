//all the controlling will be done here 

const Index = (req,res)=>{
    res.render('Backend/Category/Index.ejs',{title:'Create Category'})
}
const AddCategory = (req,res)=>{
    //save the categories to the database 
    console.log(req.body)
    const {catName,CategoryType} = req.body
}
module.exports = {Index,AddCategory}