const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    roomId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };