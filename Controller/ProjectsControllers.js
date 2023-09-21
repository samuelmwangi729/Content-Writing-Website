//check the controller here
const url = require('url')
const Order = require('../Models/Orders') 
const User = require('../Models/Users')
const Bid = require('../Models/Bids')
const Index = (req,res)=>{
    res.status(200).json({message:'Projects Index, Display ALl projects here'})
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
    const {projectID,bidTitle,bidDescrition,bidBudget} = req.body
    //check if the project exists 
    //display the user who just placed the bid
    const user = await User.findOne({email:res.locals.user.email})
    //check if the project exists 
    try{
        const project = await Order.findById(projectID)
        console.log(project)
    }catch(e){
        //if the project does not exist, return to projects page 

    }
    if(user){
        try{
            //create the bid
            const bid =  await Bid.create({
                ProjectID:projectID,
                BidTitle:bidTitle,
                BidAmount:bidBudget,
                Freelancer:user,
            })
        }catch(e){
            //catch the error here 
        }
    }
    console.log(user)
}
module.exports = {Index,createBid,SaveBid}