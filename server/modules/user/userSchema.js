const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    userType: {
        type: String,
        enum: ['blogger', 'admin'],
        default: 'blogger'
    },

}, {
    timestamps: true
});
module.exports = User = mongoose.model('user', userSchema);
