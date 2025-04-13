const {Router} = require('express');
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


module.exports ={
    adminRouter: adminRouter
}