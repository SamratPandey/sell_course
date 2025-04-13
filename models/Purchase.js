const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const purchaseSchema = new Schema({
    courseId: {
        type: ObjectId,
        ref: 'Course',
        required: true,
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;
