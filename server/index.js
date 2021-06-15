require('dotenv').config()
const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})

const options = {
    cors: true,
}
const io = require('socket.io')(server, options);


// const { checkAuthenticated } = require('./middleware/authentication');
const { addUser, removeUser, getUser, getUserInRoom } = require('./users')

// const connectDB = require('./db')
// connectDB();

// const routes = require('./routes/index')

// app.use('/api', routes)

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('join', ({ name, room }, callback) => {
        const { user } = addUser({ id: socket.id, name, room });
        // if (error) return callback(error)
        console.log(user)
        // console.log(name)
        // console.log(room)
        // console.log(socket)
        // console.log(socket.id)

        socket.emit('message', { user: 'admin', text: `${user.name},Welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the room ${user.room}` });

        socket.join(user.room)
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user ? user.room : "").emit('message', { user: user ? user.name : "", text: message })
        callback();
    });

});


