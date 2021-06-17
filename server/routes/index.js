const express = require('express');
const router = express.Router();


const userRoutes = require('./user');
router.use('/auth', userRoutes);

const messageRoutes = require('./message');
router.use('/message', messageRoutes);

const roomRoutes = require('./room');
router.use('/room', roomRoutes);



module.exports = router;
