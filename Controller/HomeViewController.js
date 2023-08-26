//set the title variable to global
//change the value later
let title = ''
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
module.exports = {Index,About,Services,Pricing,Portfolio,FAQ,Blog,Contact,Register,Login,Reset}