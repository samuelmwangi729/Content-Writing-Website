const userModel = require('../Models/Users')
let title = ''
let errors=[]
//the index page 
const Index = (req,res)=>{
    title='HomePage'
    res.render('Index.ejs',{title:title})
}
const About  = (req,res)=>{
    title="About Us"
    res.render('pages/About.ejs',{title:title})
}
const Services = (req,res)=>{
    title="Our Services"
    res.render('pages/Services.ejs',{title:title})
}
const Pricing = (req,res)=>{
    title='Our Pricing Policy'
    res.render('pages/Pricing.ejs',{title:title})
}
const Portfolio = (req,res)=>{
    title='Our Portfolio'
    res.render('pages/Portfolio.ejs',{title:title})
}
const FAQ = (req,res)=>{
    title='Frequently Asked Questions'
    res.render('pages/FAQ.ejs',{title:title})
}
const Blog = (req,res)=>{
    title="Our Blog"
    res.render('pages/Blog.ejs',{title:title})
}
const Contact = (req,res)=>{
    title='Contact Us'
    res.render('pages/Contact.ejs',{title:title})
}
const Register =(req,res)=>{
    title = 'Register Your Account'
    res.render('pages/Register.ejs',{title:title})
}
const Login =(req,res)=>{
    title = 'Login Your Account'
    res.render('pages/Login.ejs',{title:title})
}
const Reset =(req,res)=>{
    title = 'Reset Your Account\'s Password'
    res.render('pages/Reset.ejs',{title:title})
}

const RegisterUser = async (req,res)=>{
    errors=[]
    let  data={}
    //validate the data bafore they are saved to the database
    firstname = await userModel.cleanInput(req.body.firstName)
    lastname = await userModel.cleanInput(req.body.lastName)
    if(req.body.password !== req.body.confirmPassword){
        //password do not match 
       let  data = {
            'password':'Password Do not Match'
        }
        errors.push(data)
    }
    if(req.body.password==""){
        //password do not match 
       let  data = {
            'password':'Password Cannot be Empty'
        }
        errors.push(data)
    }
    if(req.body.userEmail==""){
        data={
            'email':'Email is Required'
        }
        errors.push(data)
    }
    if(req.body.firstName==""){
        data={
            'firstName':'First Name is Required'
        }
        errors.push(data)
    }
    if(req.body.lastName==""){
        data={
            'lastName':'LastName is Required'
        }
        errors.push(data)
    }
    if(errors.length == 0){
        //attempt to store them in the database
        try{
            const user = await userModel.create({
                firstName:firstname,
                lastName:lastname,
                email:req.body.userEmail,
                regReason:req.body.userReason,
                password:req.body.password,
            })
            if(user){
                data={
                    success:'user successfullt registered',
                    path:'/Login'
                }
                errors.push(data)
                res.json({errors:errors})
            }else{
                data={
                    'data':'Could not create user'
                }
                errors.push(data)
                res.json({errors:errors})
            }
        }catch(e){
            if(e.code){
                data={
                    email:'Use a different Email'
                }
                errors.push(data)
                res.json({errors:errors})
            }else{
                if(e.message.includes('validation failed')){
                    Object.values(e.errors).forEach(({properties})=>{
                        if(properties.path.includes('password')){
                            data ={
                                password:`Password::${properties.message}`
                            }
                        }
                        errors.push(data)
                    })
                }
                res.json({errors:errors})
            }
        }
    }else{
        res.json({errors:errors})
    }
}
module.exports = {Index,About,Services,Pricing,Portfolio,FAQ,Blog,Contact,Register,Login,Reset,RegisterUser}