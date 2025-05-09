require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const parseCookie = require('cookie-parser')


const { connectDB } = require('./config/db')
const { adminRouter } = require('./routers/adminRouter')
const { userRouter } = require('./routers/userRouter')
const { courseRouter } = require('./routers/courseRouter');
const { connect } = require('mongoose');



const app = express();

app.use(cors());
app.use(parseCookie());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/user', userRouter);




const main =() =>{
    connectDB();
    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    })
}
main();