const express = require('express');
const router = express.Router();

const dmodule = require('../modules/room/roomController');
const { authentication } = require('../middleware/authentication')

router.post('/create', dmodule.create);
router.get('/all', dmodule.getAllRooms);

module.exports = router;