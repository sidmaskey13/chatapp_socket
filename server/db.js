const mongoose = require('mongoose')
require('dotenv').config();

module.exports = function () {
    mongoose.connect(process.env.DATABASE,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => { console.log('Mongo connected') }).catch(err => console.log(err.message))
}