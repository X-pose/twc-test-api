/**
 * @description - All the user related CRUD operations are happening here
 */

const authModel = require('../models/authModel')
const HttpStatus = require('../enums/httpStatus')

exports.createUser = async (userData) => {

    try {
        const response = await authModel.create(userData)
        return { status: HttpStatus.CREATED, body: response }
    } catch (error) {
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, body: error }
    }
}

exports.updateUser = async (userData) => {

}

exports.getUserByEmail = async (userData) => {

    try {
        const response = await authModel.findOne({email : userData})
        return { status: HttpStatus.OK, body: response }
    } catch (error) {
        return { status: HttpStatus.NOT_FOUND, body: error }
    }
}

exports.getUserByID = async (userData) => {

}

exports.getAllUsers = async () => {

}

exports.deleteUser = async (userData) => {

}