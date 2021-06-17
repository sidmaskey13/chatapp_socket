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

const connectDB = require('./db')
connectDB();

const routes = require('./routes/index')

app.use('/api', routes)

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
    require('./modules/user/userSocket')(socket, io);
});


