const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdBy: {
        type: ObjectId,
        ref: 'Admin',
        required: true,
    },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;