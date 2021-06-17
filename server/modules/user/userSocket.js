const { addUser, removeUser, getUser, getUserInRoom } = require('./users')


module.exports = function (socket, io) {

    console.log('a user connected');
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        console.log('user disconnected')

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
        }
    });

    socket.on('join', ({ user_id, name, room }, callback) => {
        const { user } = addUser({ id: socket.id, name, room });
        if (user) {
            socket.emit('message', { user: 'admin', text: `${user.name},Welcome to the room ${user.room}` });
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the room ${user.room}` });


            socket.join(user.room)
            io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });
        }

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user ? user.room : "").emit('message', { user: user ? user.name : "", text: message })
        callback();
    });

};