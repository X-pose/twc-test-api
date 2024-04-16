/**
 * @description - All the contacts related CRUD operations are happening here
 */

const contactModel = require('../models/contactModel')
const HttpStatus = require('../enums/httpStatus')
const logger = require('../../config/logger')

exports.createContact = async (payload) => {
    try {
        const response = await contactModel.create(payload)
        return { status: HttpStatus.CREATED, body: response }
    } catch (error) {
        logger.logsInto.log('error', 'Internal server error at createContact(). More details : ' + error)
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, body: error }
    }
}

exports.updateContact = async (id, payload) => {
    try {
        const response = await contactModel.findByIdAndUpdate(id, payload, { new: true, runValidators: false }) //runValidators is set to false since this payload may or may not include all the fields in contactModel
        return { status: HttpStatus.OK, body: response }
    } catch (error) {
        logger.logsInto.log('error', 'Internal server error at updateContact(). More details : ' + error)
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, body: error }
    }
}

exports.getAllContacts = async () => {
    try {
        const response = await contactModel.find() //In here response is a list object(Since it contains all the contacts as a list)
        return { status: HttpStatus.OK, body: response }
    } catch (error) {
        logger.logsInto.log('error', 'Internal server error at getAllContacts(). More details : ' + error)
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, body: error }
    }
}



exports.deleteContact = async (id) => {
    try {
        const response = await contactModel.findByIdAndDelete(id)
        return { status: HttpStatus.OK, body: response }
    } catch (error) {
        logger.logsInto.log('error', 'Internal server error at deleteContact(). More details : ' + error)
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, body: error }
    }
}