const express = require('express');
const router = express.Router();

const dmodule = require('../modules/message/messageController');
const { authentication } = require('../middleware/authentication')

router.post('/create', dmodule.create);
router.get('/room/:id', dmodule.getAllMessageRoom);




module.exports = router;