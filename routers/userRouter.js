const { Router } = require('express');
const userRouter = Router();
const { z } = require('zod');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userZodSignUp = z.object({
    email: z.string().email(),
    password:z.string().min(6).max(20),
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
})

const userZodSignIn = z.object({
    email: z.string().email(),
    password:z.string().min(6).max(20),
})


userRouter.post('/signup', async(req,res) =>{
     const parsedData = userZodSignUp.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                message: "Invalid data"
            })
        }
        if(await User.findOne({ email: parsedData.data.email })){
            return res.status(400).json({
                message: "Email already exists"
            })
        }
        const hashPassword = await bcrypt.hash(parsedData.data.password,10);
       try {
        await User.create({
            email: parsedData.data.email,
            password: hashPassword,
            firstName: parsedData.data.firstName,
            lastName: parsedData.data.lastName
        })
        res.status(201).json({
            message: "User Signup successfully",
        })
       } catch (e) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
})

userRouter.post('/signin', async(req,res) =>{
    const parsedData = userZodSignIn.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid data"
        })
    }

    const user = await User.findOne({ email: parsedData.data.email });
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET);

    res.cookie('userToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({
        message: "Login successful",
        token: token
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