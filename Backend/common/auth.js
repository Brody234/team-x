const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../models/user')
/**
 * This function verifies the JWT in the header. If it is valid, add the authenticated account's 
 * email to the request at req.authorizedEmail. If it is invalid, reject it.
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next function to be called
 * @returns 
 */
async function verifyRequest(req, res, next) {
    const token = req.headers.token;
    console.log(req.headers.token)
    if(!token) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        //this can be used to ensure the request is being made of the correct account.
        //for instance, you shouldn't be able to get the information of any user when
        //having an arbitrary token
        req.authorizedEmail = decoded.email;
    });
    
    req.body.user = await User.findOne({email: req.authorizedEmail}).exec();

    next();
}

module.exports = { verifyRequest };