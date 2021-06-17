
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const roomSchema = new schema({
    name: {
        type: String,
        required: 'Name is required'
    }

});
module.exports = Room = mongoose.model('room', roomSchema);
