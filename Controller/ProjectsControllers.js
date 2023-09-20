//check the controller here
const url = require('url')
const Order = require('../Models/Orders') 
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
module.exports = {Index,createBid}