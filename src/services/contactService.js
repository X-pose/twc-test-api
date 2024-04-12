/**
 * @description - Contact management related business logic handled here
 * @functionality - extract JSON payload, setting response header, handling business logic.
 */

//Requires
const HttpStatus = require('../enums/httpStatus')
const { createContact, updateContact, getAllContacts, getContactById, deleteContact } = require('../controllers/contactController')
const { verifyToken } = require('./jwtService')
const sysWarn = require('../enums/systemWarnings')

exports.addContact = async (req, res) => {

    //authenticating request before proceeding further
    const reqAuthenticate = await verifyToken(req)

    if (reqAuthenticate.status === HttpStatus.OK) {

        const payload = req.body

        //new contact Body
        const newContact = {
            fullName: payload.fullName,
            email: payload.email,
            phoneNumber: payload.phoneNumber,
            gender: payload.gender
        }

        //Adding the new contact using createContact() in contactController.js
        const response = await createContact(newContact)

        //Setting response header and body
        res.status(response.status).json(response.body)
    } else {
        res.status(reqAuthenticate.status).json(reqAuthenticate.body)
    }

}

exports.updateContact = async (req, res) => {

    //authenticating request before proceeding further
    const reqAuthenticate = await verifyToken(req)

    if (reqAuthenticate.status === HttpStatus.OK) {

        const payload = req.body
        const contactId = req.params.id

        //Adding the new contact using updateContact() in contactController.js
        const response = await updateContact(contactId, payload)

        //Setting response header and body
        res.status(response.status).json(response.body)
    } else {
        res.status(reqAuthenticate.status).json(reqAuthenticate.body)
    }
}

exports.getContactById = async (req, res) => {

    //authenticating request before proceeding further
    const reqAuthenticate = await verifyToken(req)

    if (reqAuthenticate.status === HttpStatus.OK) {

        const contactId = req.params.id

        //Getting the contact using getContactById() in contactController.js
        const response = await getContactById(contactId)

        if (response.body !== null) {
            //Setting response header and body
            res.status(response.status).json(response.body)
        }
        else if (response.body === null) {

            res.status(response.status).json({ body: sysWarn.CONTACT_NOT_FOUND })
        }

    } else {
        res.status(reqAuthenticate.status).json(reqAuthenticate.body)
    }
}

exports.getAllContacts = async (req, res) => {

    //authenticating request before proceeding further
    const reqAuthenticate = await verifyToken(req)

    if (reqAuthenticate.status === HttpStatus.OK) {

        //Getting the contact using getAllContacts() in contactController.js
        const response = await getAllContacts()

        if (response.body.length !== 0) {
            //Setting response header and body
            res.status(response.status).json(response.body)
        } else if (response.body.length === 0) {
            res.status(response.status).json({ body: sysWarn.CONTACT_LIST_IS_EMPTY })
        }

    } else {
        res.status(reqAuthenticate.status).json(reqAuthenticate.body)
    }
}

exports.deleteContact = async (req, res) => {

    //authenticating request before proceeding further
    const reqAuthenticate = await verifyToken(req)

    if (reqAuthenticate.status === HttpStatus.OK) {

        const contactId = req.params.id

        //Getting the contact using deleteContact() in contactController.js
        const response = await deleteContact(contactId)

        if (response.body !== null) {
            //Setting response header and body
            res.status(response.status).json(response.body)
        }
        else if (response.body === null) {

            res.status(response.status).json({ body: sysWarn.CONTACT_NOT_FOUND })
        }

    } else {
        res.status(reqAuthenticate.status).json(reqAuthenticate.body)
    }
}