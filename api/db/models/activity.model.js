const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    points: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = { Activity };