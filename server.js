const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { adminRouter } = require('./routers/adminRouter')
const { userRouter } = require('./routers/userRouter')
const { courseRouter } = require('./routers/courseRouter')


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/user', userRouter);





app.listen(8000, () => {
    console.log('Server is running on port 8000');
})