const { Router } = require('express');
const userRouter = Router();


userRouter.post('/signup', (req,res) =>{
    res.status(200).json({
        message: "Login successful"
    })
})
userRouter.post('/signin', (req,res) =>{
    res.status(200).json({
        message: "Login successful"
    })
})
userRouter.get('/courses', (req,res) =>{
    res.status(200).json({
        message: "Login successful"
    })
})
userRouter.post('/purchase', (req,res) =>{
    res.status(200).json({
        message: "Login successful"
    })
})

module.exports = {
    userRouter: userRouter
}