/**
 * @description - All the user related CRUD operations are happening here
 */

const authModel = require('../models/authModel')
const HttpStatus = require('../enums/httpStatus')
const logger = require('../../config/logger')

exports.createUser = async (userData) => {

    try {
        const response = await authModel.create(userData)
        return { status: HttpStatus.CREATED, body: response }
    } catch (error) {
        logger.logsInto.log('error', 'Internal server error at createUser(). More details : ' + error)
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, body: error }
    }
}


exports.getUserByEmail = async (userData) => {

    try {
        const response = await authModel.findOne({ email: userData })
        return { status: HttpStatus.OK, body: response }
    } catch (error) {
        logger.logsInto.log('error', 'Internal server error at getUserByEmail(). More details : ' + error)
        return { status: HttpStatus.NOT_FOUND, body: error }
    }
}


