const express = require('express')
const {Index,
    About,Services,Pricing,Portfolio,FAQ,Blog,Contact,Register,Login,Reset,RegisterUser} = require('../Controller/HomeViewController')
const homeRoute = express.Router()

homeRoute.get("/",Index)
.get('/About',About)
.get('/Services',Services)
.get('/Pricing',Pricing)
.get('/Portfolio',Portfolio)
.get('/Blog',Blog)
.get('/FAQ',FAQ)
.get('/Contact',Contact)
.get('/Register',Register)
.get('/Login',Login)
.get('/Reset',Reset)
.post('/Register',RegisterUser)
module.exports = homeRoute