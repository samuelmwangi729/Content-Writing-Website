const express = require('express')
const homeRoutes = require('./Routes/Home')
 const app = express()

 app.listen(8080)
 app.use(express.static('Resources'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
 app.set('view engine','ejs')
 app.set('views','Views') 
 app.use(homeRoutes)
 app.use((req,res)=>{
    res.render('pages/Error.ejs',{title:'Error!!!Page Not Found'})
 })