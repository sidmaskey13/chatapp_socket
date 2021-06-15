const express = require('express');
const router = express.Router();

const dmodule = require('../modules/user/userController');
const { authentication, admin } = require('../middleware/authentication')

router.post('/register', dmodule.register);
router.post('/login', dmodule.login);
router.post('/login-google', dmodule.googleLogin);
router.get('/users', authentication, admin, dmodule.allUsers);
router.get('/load-user', authentication, dmodule.loadLoggedInUser);
router.delete('/delete/:id', authentication, admin, dmodule.delete);



module.exports = router;