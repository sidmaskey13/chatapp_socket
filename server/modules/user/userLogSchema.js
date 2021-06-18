
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userLogSchema = new schema({
    socket_id: { type: String },
    room: { type: schema.Types.ObjectId, ref: 'room' },
    user: { type: schema.Types.ObjectId, ref: 'user' },
});
module.exports = userLog = mongoose.model('userLog', userLogSchema);
