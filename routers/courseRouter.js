const { Router } = require('express');
const courseRouter = Router();


courseRouter.post('/create', (req, res) =>{
    res.status(200).json({
        message: "Course created successfully"
    })
})


module.exports = {
    courseRouter: courseRouter
}