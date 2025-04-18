const {Router} = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const Admin = require('../models/Admin');
const adminRouter = Router();


adminRouter.post('/signin', (req, res) => {
    res.status(200).json({
        message: "Login successful"
    })

})
adminRouter.post('/signup', (req, res) => {
    res.status(200).json({
        message: "Login successful"
    })

})
adminRouter.get('/course', (req, res) => {
    res.status(200).json({
        message: "Login successful"
    })

})
adminRouter.post('/course',(req, res)=>{

})
adminRouter.put('/course',(req, res)=>{
    
})


module.exports ={
    adminRouter: adminRouter
}