/**
 * @description - Route file responsible for the contact management process
 */

//Requires
const express = require('express')
const router = express.Router()
const { addContact, updateContact, getAllContacts, getContactById, deleteContact } = require('../services/contactService')

router.post('/', async (req, res) => {
    await addContact(req, res)
})

router.patch('/:id', async (req, res) => {
    await updateContact(req, res)
})

router.get('/', async (req, res) => {
    await getAllContacts(req, res)
})

router.get('/:id', async (req, res) => {
    await getContactById(req, res)
})

router.delete('/:id', async (req, res) => {
    await deleteContact(req, res)
})

module.exports = router