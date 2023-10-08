const {Membership,MembersTakesBid} = require('../Models/Membership')
const User = require('../Models/Users')
const Index = async (req,res)=>{
    //set the membership plans
    const memberships = await  Membership.find({Status:'Active'})
    res.render('Backend/Memberships/Plans.ejs',{memberships:memberships})
}

const AddMembership = async (req,res)=>{
    //post the data to the membership model 
    const {title,benefit,fees} = req.body
    //check if there is any membership with the title
    const titleTrimed = title.trim()
    const membershipObj = await Membership.findOne({Title:titleTrimed})
    //get the user with the user object 
    const user = await User.findOne({email:res.locals.user.email}) 
    if(!user){
        //skip this
        res.status(400).json({status:'error',message:`Bad Request`})
    }else{
        if(membershipObj){
            //then update the object
            let bArray = membershipObj.Benefits
            bArray.push(benefit)
            membershipObj.Title = titleTrimed,
            membershipObj.Benefits =bArray
            membershipObj.SubscriptionFees = fees?fees: membershipObj.SubscriptionFees
            membershipObj.updatedBy = user
            membershipObj.save()
            res.status(201).json({status:'success',message:`Membership Updated`})
        }else{
            const membership = await Membership.create({
                Title:title.trim(),
                Benefits:benefit,
                SubscriptionFees:fees,
                createdBy:user
            })
            if(membership){
                res.status(201).json({status:'success',message:`Membership Profile ${title} Created Successfully`})
            }
        }
    }
}
const DeleteMembership = async (req,res) =>{
    //get the data 
    const {MembershipID} = req.body
    //get the membership plan
    const membershipObj = await Membership.findById(MembershipID)
    if(membershipObj){
        await Membership.findByIdAndDelete(MembershipID)
        res.status(200).json({status:'success',message:'Successfully Deleted',reload:true})
    }else{
        res.status(400).json({status:'error',message:'Unknown Error Occurred',reload:false})
    }
}
const  getProjectDetails = async (req,res)=>{
    const {MembershipID} = req.body
    //check if the memberrship plan exists 
    const membership = await Membership.findById(MembershipID)
    if(membership){
        //return the membership object with a success
        res.status(201).json({status:'success',data:membership})
    }else{
        res.status(400).json({status:'error',data:[]})
    }
}
const MembershipSettings = async(req,res)=>{
    //get the memberships here
    const memberships = await Membership.find({Status:'Active'})
    const settingsMembers = await MembersTakesBid.find({Status:'Active'})
    res.status(200).render('Backend/Memberships/Settings.ejs',{memberships:memberships,settingsMembers:settingsMembers})
}
const MembershipSettingsPost = async(req,res)=>{
    const {Title,Takes,Bids,Expires} = req.body
    //get the profile membership here 
    const membership = await Membership.findById(Title)
    //the expiry date is for the new memberships
     
     //check if the bid exists
     const bidsettingsexists = await MembersTakesBid.findOne({Title:membership.Title})
     if(bidsettingsexists){
        //update the existing values
        bidsettingsexists.Title = membership.Title
        bidsettingsexists.Takes = Takes
        bidsettingsexists.Bids = Bids
        bidsettingsexists.RenewsAfter = Expires
        bidsettingsexists.save()
        statusCode=200
        statusMsg="success"
        message="Settings Successfully Updated"
     }else{
        const membersbidsettings = await MembersTakesBid.create({
            Title:membership.Title,
            Takes:Takes,
            Bids:Bids,
            RenewsAfter:Expires
        })
        if(membersbidsettings){
            statusCode=201
            statusMsg="success"
            message="Settings Successfully Created"
        }else{
            statusCode=400
            statusMsg="error"
            message="Unknown Error Occured"
        }
     }
     res.status(statusCode).json({status:statusMsg,message:message})
}
const DeletePlan = async(req,res)=>{
    //check the items here
    const {PlanID} = req.body
    //check if the plan exists 
    const plan = await MembersTakesBid.findById(PlanID)
    console.log(plan)
    if(plan){
        plan.deleteOne()
        res.status(201).json({Title:'success',Message:'Plan Successfully Deleted'})
    }else{
        res.status(400).json({Title:'error',Message:'An error Occurred'})
    }
}
module.exports={Index,DeletePlan,AddMembership,getProjectDetails,MembershipSettingsPost,MembershipSettings,DeleteMembership}