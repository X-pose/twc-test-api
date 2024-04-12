/**
 * @description - This file defines the contact model for mongoDB
 */

const mongoose = require('mongoose')

//Schema for contacts
const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phoneNumber: { type: String, required: true, minlength: 10 },
    gender: { type: String, required: true, enum: ['male', 'female'] }

}, { collection: 'Contacts' })

//Creating mongoose model using Schema
const contactModel = mongoose.model('contactModel', contactSchema)

//Exporting model to be used by contactController.js
module.exports = contactModel