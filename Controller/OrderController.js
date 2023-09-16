const Categorys = require('../Models/Categories')
const Order = require('../Models/Orders')
const User = require('../Models/Users')
const path  = require('path')
const Index = async (req,res)=>{
    //filter out the categories that use orders only 
    categories = await Categorys.find({CategoryType:'Content'})
    res.render('Backend/Orders/Index.ejs',{title:'Orders Index Page',categories:categories})
}
const SaveOrder = async (req,res)=>{
    //display the req object
    const files = req.files 
    const {Title,Category,Description,ProjectType,Budget,Deadline} = req.body
    const fileNameArray = []
    //find the category 
    let category = await Categorys.findOne({CategoryName:Category})
    //check if category exists 
    if(!category){
        res.status(500).json({error:'Unknown Server Error',message:'Could not create Your Order'})
    }else{
        let catID = (category?._id).toString().split("\"")[0]
        //check if the project is a duplicate 
        const ordExists = await Order.findOne({Title:Title})
        console.log(ordExists)
        if(ordExists){
            console.log('Duplicate Project Posted')
        }else{
            //check if the request has files
            if(req.files){
                Object.keys(files).map((item)=>{
                    fileNameArray.push(files[item].name)
                    //upload the files to the server 
                    const filePath = path.join(__dirname,'OrderFiles',files[item].name)
                    files[item].mv(filePath,(err)=>{
                        if(err){
                            console.log('Could not upload the images')
                        }else{
                            console.log('uploaded the images')
                        }
                    })
                })
            }else{
                //skip
            }
            const userLoggedIn = await User.getUID(res.locals.user.email)
            const order = await Order.create({
                Title:Title,
                Category:catID,
                Description:Description,
                ProjectFile:fileNameArray,
                Budget:Budget,
                ProjectType:ProjectType,
                HourRate:Budget,
                SubmitBy:Deadline,
                Client:userLoggedIn
            })
        }
    }
}
const MyOrders = async (req,res)=>{
    //get the personal orders 
    // console.log(res.locals.user)
    const userOBJ = await User.findOne({email:res.locals.user.email})
    if(!userOBJ){
        //then the user does not exist
    }else{
        const orders = await Order.find({Client:userOBJ})
        res.render('Backend/Orders/Personal.ejs',{orders:orders})
    }
    //posted by the clients 
}

module.exports = {Index,SaveOrder,MyOrders}