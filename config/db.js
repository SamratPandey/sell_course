const mongoose = require('mongoose');


const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI, {dbName: 'courseSelling'});
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Database connection failed', error.message)
    }

}

module.exports = {connectDB};