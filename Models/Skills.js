const {Schema,model} = require('mongoose')
const User = require('./Users')
const Categories = require('./Categories')
const SkillsSchema = new Schema({
    Userid:{
        type:Schema.Types.ObjectId,
        ref:User,
        required:[true,'User Id required']
    },
    SkillCategory:{
        type:Schema.Types.ObjectId,
        ref:Categories,
        required:[true,'Skills Category Must be Given']
    },
    skill:{
        type:String,
        required:[true,'Skill is required']
    },
    skillStatus:{
        type:String,
        enum:['Verified','Unverified','Pending'],
        default:'Unverified'
    }
})
//compile the models 
const Skills = model('Skills',SkillsSchema)
module.exports=Skills