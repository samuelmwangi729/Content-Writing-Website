//check the controller here
const url = require('url')
const Order = require('../Models/Orders') 
const User = require('../Models/Users')
const Bid = require('../Models/Bids')
<<<<<<< HEAD
const Index = async (req,res)=>{
    //display all the orders here that are yet to be assigned to anyone
    //display online orders only 
    //also skip the orders where the user is the current logged in user
    let orders = await Order.find({Status:"Pending"})
    console.log(orders)
    res.status(200).render('Backend/Projects/All.ejs',{projects:orders})
=======
const moment = require('moment')
const countdown = require('moment-countdown');
const TakeProject = async (req,res)=>{
    //check the user's membership status 
    //check if the project exists 
    //update the take limit 
    //update the project status
    //make sure its hidden
    //return a reload signal
    res.status(200).json({message:'Project Taken'})
}
const Index = async (req,res)=>{
    //get all the projects that are active. 
    //For testing purposes, we will display all the projects alias orders
    projects = await Order.find({Status:'Pending'})
    res.locals.moment = moment
    res.locals.countdown = countdown
    res.render('Backend/Projects/All.ejs',{projects:projects})
>>>>>>> a63599a1fc0c38470a1e5c604d32629a22a56768
}
const createBid = async (req,res)=>{
    //get the url parameter
    const {query} = url.parse(req.url,true)
    //check if the order exists 
    try{
        const projectExist = await Order.getProject(query.projectID)
        if(projectExist){
            //then return the order object 
            const project = await Order.findById(query.projectID)
            res.status(200).render('Backend/Projects/Bids.ejs',{project:project,projectID:query.projectID})
        }else{
            res.status(200).redirect('/Projects')
        }
    }catch(e){
        res.status(400).redirect('/Projects')
    }
}
const SaveBid = async (req,res)=>{
    //try and save the bid from the frontend 
    //check if the project exists
    const {projectID,bidTitle,bidDescription,bidBudget} = req.body
    //check if the project exists
    //display the user who just placed the bid
    const user = await User.findOne({email:res.locals.user.email})
    //check if the project exists 
    try{
        const project = await Order.findById(projectID)
        if(user){
            try{
                //check if a bid with the project id and userid exists 
                const bidExists = await Bid.bidExist(projectID,res.locals.user.email)
                if(bidExists){
                    res.status(400).json({status:'error',message:'Duplicate Bid Placed'})
                }else{
                    //create the bid
                    const bid =  await Bid.create({
                        ProjectID:project,
                        BidTitle:bidTitle,
                        BidDescription:bidDescription,
                        BidAmount:bidBudget,
                        Freelancer:user,
                    })
                    if(bid){
                        res.status(201).json({status:'success',message:'Bid successfully Placed'})
                    }
                }
            }catch(e){
                //could not place the bid
                res.status(400).json({status:'error',message:'Could not place the bid. Please try again later'})
            }
        }else{
            //User error
            res.status(400).json({status:'error',message:'Bad Request. Try Again Later'})
        }
    }catch(e){
        //if the project does not exist, return to projects page 
        res.status(400).json({status:'error',message:'Bad Request. Try Again Later'})

    }
}
module.exports = {Index,createBid,SaveBid,TakeProject}