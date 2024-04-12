/**
 * @description - This service class is used to authenticate the request by checking the validity of JWT token
 * @functionality - Check for the JWT token, validate if available, extract user ID.
 */

//Requires
const jwt = require('jsonwebtoken')
require('dotenv').config();
const sysWarn = require('../enums/systemWarnings')
const HttpStatus = require('../enums/httpStatus')



//Verifying JWT token
exports.verifyToken = async (req) => {

    //Extracting token from the header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

    //Checks for missing tokens
    if (!token) {
        return { status: HttpStatus.UNAUTHORIZED, body: sysWarn.MISSING_JWT_TOKEN }
    }

    try {
        //Decodes token and extract UserID - Not needed for the given tasks
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId
        return { status: HttpStatus.OK, body: userId }

    } catch (error) {
        //If error occured during decode phase, responds with Invalid token message.
        return { status: HttpStatus.UNAUTHORIZED, body: sysWarn.INVALID_JWT_TOKEN }
    }
};