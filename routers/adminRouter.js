const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const Admin = require('../models/Admin');
const Course = require('../models/Course');
const { adminMiddleware } = require('../middlewares/admin');
const adminRouter = Router();


const adminZodSignUp = z.object({
    email: z.string().email(),
    password:z.string().min(6).max(20),
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
})

const adminZodSignIn = z.object({
    email: z.string().email(),
    password:z.string()
})


adminRouter.post('/signup', async (req, res) => {
    const parsedData = adminZodSignUp.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid data"
        })
    }
    if(await Admin.findOne({ email: parsedData.data.email })){
        return res.status(400).json({
            message: "Email already exists"
        })
    }
    const hashPassword = await bcrypt.hash(parsedData.data.password,10);
   try {
    await Admin.create({
        email: parsedData.data.email,
        password: hashPassword,
        firstName: parsedData.data.firstName,
        lastName: parsedData.data.lastName
    })
    res.status(201).json({
        message: "Admin created successfully",
    })
   } catch (e) {
    res.status(500).json({
        message: "Internal server error",
    })
   }
})

adminRouter.post('/signin', async (req, res) => {
    const parsedData = adminZodSignIn.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid data"
        })
    }
    const admin = await Admin.findOne({ email: parsedData.data.email });
    if (!admin) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(parsedData.data.password, admin.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_SECRET);

    res.cookie('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({
        message: "Login successful"
    })
    
})


const courseZod=z.object({
    title: z.string().min(3).max(50),
    description: z.string().min(10).max(500),
    price: z.number().positive(),
    image: z.string().url()
})


adminRouter.post('/course', adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    const parsedData = courseZod.safeParse(req.body)
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid data"
        })
    }
    const course = await Course.create({
        title: parsedData.data.title,
        description: parsedData.data.description,
        price: parsedData.data.price,
        image: parsedData.data.image,
        createdBy: adminId
    });
    res.status(201).json({
        message: "Course created successfully",
        course: course
    })

})
adminRouter.get('/course', adminMiddleware, async (req, res)=>{
    const adminId = req.adminId;
    if(!adminId) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const courses = await Course.find({ createdBy: adminId });
        if (!courses) {
            return res.status(404).json({
                message: "No courses found"
            })
        }else{
            res.status(201).json({
                message: "Successful",
                course: courses
        })
    }
    
})
adminRouter.put('/course',(req, res)=>{
    
})


module.exports ={
    adminRouter: adminRouter
}