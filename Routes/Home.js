const express = require('express')
const {Index} = require('../Controller/HomeViewController')
const homeRoute = express.Router()

homeRoute.get("/",Index)


module.exports = homeRoute