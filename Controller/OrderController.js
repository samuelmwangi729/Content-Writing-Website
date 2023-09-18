const Categorys = require('../Models/Categories')
const Order = require('../Models/Orders')
const User = require('../Models/Users')
const path  = require('path')
const url =  require('url')
const moment = require('moment')
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
        res.status(400).json({error:'Unknown Server Error',message:'Could not create Your Order'})
    }else{
        let catID = (category?._id).toString().split("\"")[0]
        //check if the project is a duplicate 
        const ordExists = await Order.findOne({Title:Title})
        console.log(ordExists)
        if(ordExists){
            res.status(400).json({error:'error',message:'An Order Similar to this One Has Already Been Posted'})
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
            if(order){
                //order created successfuly 
                res.status(201).json({success:'success',message:'Order Created Successfully'})
            }else{
                res.status(400).json({error:'error',message:'Could Not Created the Order'})
            }
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
const OrderSingle = async (req,res)=>{
    //get the query parameter 
    const {query} = url.parse(req.url,true)
    let orderID = query.OrderID
    let user = await User.findOne({email:res.locals.user.email})
    const OrderSingle = await Order.findOne({_id:orderID,Client:user})
    if(!OrderSingle){
        res.redirect('/MyOrders')
    }else{
        //get the category Name 
        res.locals.moment = moment
        const categoryOrder = await Categorys.findById(OrderSingle.Category)
        const ordersDir = __dirname
        res.render('Backend/Orders/Single.ejs',{order:OrderSingle,category:categoryOrder?.CategoryName,ordersDir:ordersDir})
    }
}

//create a route to handle withdrawn Order

const WithdrawOrder = async (req,res)=>{
    //parse the url to get the parameters 
    const {query} = url.parse(req.url,true)
    //get the order ID
    let userEmail = res.locals.user.email
    const orderExists =  await Order.isExists(query.orderID,userEmail)
    console.log(orderExists)
    if(orderExists){
        //then get the Order Object
        try {
            const user = await User.findOne({email:userEmail})
            let orderDetails = await Order.findOne({_id:query.orderID,Client:user})
            orderDetails.Status = 'Withdrawn'
            orderDetails.save()
            //return a message to the frontend
            res.status(200).redirect('/MyOrders')
        } catch (error) {
            res.status(400).redirect('/MyOrders')
        }
    }else{
        res.status(400).redirect('/MyOrders')
    }
}
const DeleteOrder = async (req,res)=>{
    //parse the url to get the parameters 
    const {query} = url.parse(req.url,true)
    //get the order ID
    let userEmail = res.locals.user.email
    const orderExists =  await Order.isExists(query.orderID,userEmail)
    if(orderExists){
        //then get the Order Object
        try {
            //check also the user email 
            const user = await User.findOne({email:userEmail})
            const order = await Order.findOneAndDelete({_id:query.orderID,Client:user})
            console.log('deleting record')
            //return a message to the frontend
            res.status(200).redirect('/MyOrders')
        } catch (error) {
            console.log("could not delete")
            res.status(400).redirect('/MyOrders')
        }
    }else{
        res.status(400).redirect('/MyOrders')
    }
}
module.exports = {Index,SaveOrder,MyOrders,OrderSingle,WithdrawOrder,DeleteOrder}