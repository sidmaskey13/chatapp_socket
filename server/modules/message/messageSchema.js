
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const messageSchema = new schema({
    text: { type: String },
    room: { type: schema.Types.ObjectId, ref: 'room' },
    sender: { type: schema.Types.ObjectId, ref: 'user' },
});
module.exports = Message = mongoose.model('message', messageSchema);
