const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');
const userSchema = require('../modules/user/userSchema')
const otherHelper = require('../helper/other.helper');

const CLIENT_ID = process.env.CLIENT_ID;
const jwtKey = process.env.JWT_PRIVATE_KEY;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

const authMiddleware = {};

authMiddleware.checkAuthenticated = async (req, res, next) => {
    let token = req.cookies['session-token'];
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
    }
    verify()
        .then(() => {
            req.user = user;
            next();
        })
        .catch(err => {
            res.redirect('/login')
        })

}

authMiddleware.authentication = async (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;
    if (!token) return res.status(401).send('Access denied, No token provided')
    try {
        token = token.replace('Token ', '');
        const decoded = jwt.verify(token, jwtKey)
        req.user = decoded;
        next()
    }
    catch (ex) {
        return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, true, null, null, 'Invalid Token', null);
    }
}

authMiddleware.admin = async (req, res, next) => {
    try {
        const user_id = req.user.user._id
        const user = await userSchema.findById(user_id).select('userType').lean()
        if (user.userType == 'admin') {
            next()
        }
        else {
            return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, true, null, null, 'Permission only for Admin', null);
        }

    }
    catch (ex) {
        console.log(ex)
        res.status(400).send('Error')
    }
}
module.exports = authMiddleware;
