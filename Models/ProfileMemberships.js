const { Schema , model } = require("mongoose");
const Membership = require('./Membership')
const User = require('./Users')

const ProfileMembershipSchema = new Schema({
    UserID:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:[true,'User Id is required']
    },
    MembershipID:{
        type:Schema.Types.ObjectId,
        ref:Membership,
        required:[true,'Membership ID is required']
    },
    ExpiryDate:{
        type:Date,
        required:true
    },
    Status:{
        type:String,
        enum:['Active','Expired']
    }
},{
    timestamps:true
})

//compile to model 
const ProfileMembership = model('ProfileMembership',ProfileMembershipSchema)
module.exports = ProfileMembership