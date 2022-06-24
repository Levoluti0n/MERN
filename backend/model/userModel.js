const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name field']
    },
    email: {
        type: String,
        required: [true, 'Please add an email field']
    },
    password: {
        type: String,
        required: [true, 'Please add a password field'],
        unique: true
    },
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
