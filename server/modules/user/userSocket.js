const { addUser, removeUser, getUser, getUserInRoom } = require('./users')
const messageSchema = require('../message/messageSchema')


module.exports = function (socket, io) {

    console.log('a user connected');
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        console.log('user disconnected')

        if (user) {
            io.to(user.room).emit('message', { user: '(Admin)', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
        }
    });

    socket.on('join', ({ user_id, name, room }, callback) => {
        const { user } = addUser({ id: socket.id, name, room });
        if (user) {
            console.log(user)
            socket.emit('message', { user: '(Admin)', text: `${user.name},Welcome to the room ${user.room}` });
            socket.broadcast.to(user.room).emit('message', { user: '(Admin)', text: `${user.name} has joined the room ${user.room}` });

            socket.join(user.room)
            io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
        }

        callback();
    });

    socket.on('sendMessage', async (messageData, callback) => {
        const user = getUser(socket.id)
        console.log("user room:", user.name)
        console.log("user name:", user.room)
        console.log("messageData", messageData.room_id)
        io.to(messageData.room_id).emit('message', { user: user ? user.name : "", text: messageData.message })
        const messageDB = { text: messageData.message, sender: messageData.user_id, room: messageData.room_id }
        const new_message = new messageSchema(messageDB);
        const new_message_save = await new_message.save();
        callback();
    });

};