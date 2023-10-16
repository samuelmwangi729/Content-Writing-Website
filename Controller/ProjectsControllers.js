//check the controller here
const url = require('url')
const InitPay = require('../Models/InitializedPayments')
const Order = require('../Models/Orders') 
const User = require('../Models/Users')
const Bid = require('../Models/Bids')
const moment = require('moment')
const countdown = require('moment-countdown');
const {Membership,MembersTakesBid,userMembershipTracker} = require('../Models/Membership')
require('dotenv').config();
const express = require('express')
const https = require('https');
const Payments = require('../Models/Payments')
const TakeProject = async (req,res)=>{
    const {id} = req.body
    const userEmail = res.locals.user.email
    //check if the user is logged in
    if(userEmail){
        const user = await User.findOne({email:userEmail})
        //find the order and update the status to awarded
        const order = await Order.findById(id)
        if(order){
            if(order.Status==='Awarded'){
                res.status(400).json({status:'error',message:'Bad request'})
            }else{
            //then the order exists, else erturn an error message 
            order.Status='Awarded'
            order.AwardedTo = userEmail
            order.save()
            await UpdateObj('Take',order.Proposals,user.email)
            //send a refresh signal
            res.status(200).json({status:'success',message:'Congratulations, You took the project',refresh:true})
            }
        }else{
            res.status(400).json({status:'error',message:'Bad request'})
        }
    }else{
        //user not logged in 
        res.status(400).json({status:'error',message:'Bad request'})
    }
    //check the user's membership status 
    //check if the project exists 
    //update the take limit 
    //update the project status
    //make sure its hidden
    //return a reload signal
}
const Index = async (req,res)=>{
    //get all the projects that are active. 
    //For testing purposes, we will display all the projects alias orders
    projects = await Order.find({Status:'Online'})
    res.locals.moment = moment
    res.locals.countdown = countdown
    res.render('Backend/Projects/All.ejs',{projects:projects})
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
    const project = await Order.findById(projectID)
    //check if the project exists 
    try{
        if(user){
            try{
                //check if a bid with the project id and userid exists 
                const bidExists = await Bid.bidExist(projectID,res.locals.user.email)
                if(bidExists){
                    res.status(400).json({status:'error',message:'You had already Placed your bid On this Project'})
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
                        //if bidding is done, then update the userMembershipTracker set bid to bid-1
                        //get the user email and then check  the bids
                        const userEmail = user.email
                        //update the bids, if it is takes, then update the takes 
                        await UpdateObj('Bid',project.Proposals,user.email)
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
const UpdateObj = async (Type,Project,email)=>{
    //get the membership tracker object
    let userMembershipTrackerObj= await userMembershipTracker.findOne({userEmail:email,Status:'Active'})
    if(Type ==='Bid'){
        let existingBids =  userMembershipTrackerObj.Bids
        userMembershipTrackerObj.Bids = existingBids - Project
    }else{
        let existingTakes =  userMembershipTrackerObj.Takes
        userMembershipTrackerObj.Takes = existingTakes - 1
    }
    userMembershipTrackerObj.save()
    if(userMembershipTrackerObj){
        return true
    }else{
        return false
    }
}
const ProjectsPayments = async (req, res)=>{
    const public_key = process.env.LIVE_PUBLIC_KEY
    const secret_key = process.env.LIVE_SECRET_KEY
    const params = JSON.stringify({
        "email": "samuelmwangi729@gmail.com",
        "amount": 50 * 100,
        "metadata": {
          "custom_fields": [
            {
                //set the value for the order the client is paying for
              "value": "makurdi",
              "display_name": "Donation for",
              "variable_name": "donation_for"
            }
          ]
        },
        "bank":{
            "code": "057",
            "account_number": "0000000000"
        },
        "birthday": "1995-12-23"
      })
      
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secret_key}`,
          'Content-Type': 'application/json'
        }
      }
      
      const reqData = https.request(options, resp => {
        let data = ''
      
        resp.on('data', (chunk) => {
          data += chunk
        });
      
        resp.on('end', () => {
            const ed = JSON.parse(data)
            if(ed.status){
                res.redirect(ed.data['authorization_url'])
            }else{
                res.json(ed)
            }
        })
      }).on('error', error => {
      })
      
      reqData.write(params)
      reqData.end()
}
const DepositProject = async (req,res) =>{
    //get the url parameters
    const {query} = url.parse(req.url,true)
    let OrderID = query.OrderID
    const userEmail = res.locals.user.email
    const projectExists = await Order.isExists(OrderID,userEmail)
    if(projectExists){
        //initialize the payment method
        const project = await Order.findById(OrderID)
        //call the pay function and set the payment reason to the function 
        await InitiatePay(res,OrderID,"Order","Deposit For Order",project.Budget,userEmail)
    }else{
        //return redirect back to dashboard 
        res.redirect("/MyOrders")
    }
} 
const InitiatePay = async (res,PaymentID,PaymentType,Reason,Amount,userEmail)=>{
    //first check the logged in user
    //logic -> check if the user had initialized payment, if initialized and had paid partial amount, set the amount to pay as the difference
    const userObj = await User.findOne({email:userEmail})
    const project = await Order.findOne({_id:PaymentID,Client:userObj})
    let payAmount = Amount * 100
    const secret_key = process.env.LIVE_SECRET_KEY
    const params = JSON.stringify({
        "email": userEmail,
        "amount": payAmount,
        // "currency":"USD",
        "metadata": {
          "custom_fields": [
            {
                //set the value for the order the client is paying for
              "value": Reason,
              "display_name": "Payment for",
              "variable_name": "payment_for"
            },
            {
                "value": PaymentID,
                "display_name": "Payment Ref",
                "variable_name": "payment_ref"
            },
            {
                "value": PaymentType,
                "display_name": "Payment For",
                "variable_name": "payment_for"
            }
          ]
        },
      })
      
    const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
        headers: {
            Authorization: `Bearer ${secret_key}`,
            'Content-Type': 'application/json'
        }
    }
    
    const reqData = https.request(options, resp => {
        let data = ''
        resp.on('data', (chunk) => {
            data += chunk
        });
        resp.on('end', async () => {
            const ed = JSON.parse(data)
            if(ed.status){
                const initLog = await InitPay.create({
                    InitStatus:ed.status,
                    Message:ed.message,
                    AuthUrl:ed.data['authorization_url'],
                    AccessCode:ed.data['access_code'],
                    PaymentRef:ed.data['reference'],
                    PaymentReason:Reason,
                    UserEmail:userEmail,
                    OurRef:PaymentID,
                    PaymentType:PaymentType,
                    AmountPaid:Amount,
                })
                if(initLog){
                    res.redirect(ed.data['authorization_url'])
                }
            }else{
                res.redirect("/Dashboard")
            }
        })
    })
    .on('error', error => {
        //if there is an error, return an error and redirect to dashboard
        res.status(400).redirect("/Dashboard")
    })
    reqData.write(params)
    reqData.end()

}
const getCallBackData = async (req,res)=>{
    const data = req.body
    const stats = data.data
    let paymentStatus = stats.status //Our reference in the payment Initialized
    let paymentref = stats.reference
    let paymentAmount = stats.amount / 100
    let paymentChannel = stats.channel
    let paymentCurrency = stats.currency
    let ipAddress = stats.ip_address
    let cardBin = stats.authorization.bin
    let cardLastFour = stats.authorization.last4
    let cardExpMonth =stats.authorization.exp_month
    let cardExpYear =stats.authorization.exp_year
    let cardType =stats.authorization.card_type
    let cardBank =stats.authorization.bank
    let cardCountry =stats.authorization.country_code
    let cardBrand =stats.authorization.brand
    let customerEmail = stats.customer.email
    let paidAt =  data.data.paidAt
    //update the payments table
    const payment = await Payments.create({
        paymentStatus:paymentStatus,
        paymentref:paymentref,
        paymentAmount:paymentAmount,
        paymentChannel:paymentChannel,
        paymentCurrency:paymentCurrency,
        ipAddress:ipAddress,
        cardBin:cardBin,
        cardLastFour:cardLastFour,
        cardExpMonth:cardExpMonth,
        cardExpYear:cardExpYear,
        cardType:cardType,
        cardBank:cardBank,
        cardCountry:cardCountry,
        cardBrand:cardBrand,
        customerEmail:customerEmail,
        paidAt:paidAt,
    })
    //then check if the amount paid is the same as the project amount 
    const initialPay = await InitPay.findOne({PaymentRef:paymentref})
    // console.log(initialPay)
    const user = await User.findOne({email:initialPay.UserEmail})
    //check if the reason is Membership or Project payment. If its profile, then
    if(initialPay.PaymentType=="Membership"){
        //update the membership profile
        const membership = await Membership.findOne({Title:initialPay.OurRef})
        if(membership){
            //get the bids and takes 
            const {Title,Takes,Bids,RenewsAfter} = await MembersTakesBid.findOne({Title:initialPay.OurRef})
            //use renews after for calculations
            const expiryDate = new Date(new Date().getTime()+(RenewsAfter*24*60*60*1000))
            let currentMonth = expiryDate.getMonth() +1
            let currentDay = expiryDate.getDate()
            if(currentMonth===2 && currentDay>28){
                //set the date to the current time but on date 28th feb 
                expiryDate.setDate(28)
            }
            //update the membership tracker here with the bids and the takes one ought to get
            //after bidding and taking the project, the bids and takes are updated here
            const ptracker = await userMembershipTracker.create({
                userEmail:user.email,
                membershipTitle:Title,
                Takes:Takes,
                Bids:Bids,
                ExpiresOn:expiryDate
            })
            if(ptracker){
                const payment = await Payments.findOne({
                        paymentref:paymentref,
                })
                payment.Status = 'Used'
                payment.save()
                res.json({Data:'Payment Success'})
            }else{
                res.json({Data:'Payment Not'})
            }
        }
    }
    else{
        const project = await Order.findOne({_id:initialPay.OurRef,Client:user})
        if(project){
            project.Status = "Online"
            project.PaymentStatus = "Paid"
            project.save()
        }
        //check from the initialized table
        //if true, redirect to projects page 
        //else, go back with an error message
        res.json({data})
    }
}
const RedirectAfterCallback = (req,res)=>{
    res.redirect('/Dashboard')
}
const getTakenProjects = async (req,res)=>{
    const user = res.locals.user.email
    //get all the projects that are online and also the status is paid and also the freelancer is you 
    const takenProjects = await Order.find({Status:'Awarded',PaymentStatus:'Paid',AwardedTo:user})
    res.status(201).render('Backend/Projects/Taken.ejs',{projects:takenProjects})
}
const GetProjectDetails = async(req,res)=>{
    //get the request parameter from the body
    const {ProjectID} = req.body
    //check if the project exists
    const projectExists = await Order.findById(ProjectID)
    if(projectExists){
        //return the project object
        res.status(200).json({project:projectExists,status:'success',message:'Success'})
    }else{
        res.status(400).json({status:'error',message:'Unknown Error Occurred!! Please try again later'})
    }
}
module.exports = {Index,createBid,SaveBid,TakeProject,GetProjectDetails,getTakenProjects,ProjectsPayments,DepositProject,getCallBackData,RedirectAfterCallback}