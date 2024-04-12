/**
 * @description - This file defines the authentication model for mongoDB
 */

const mongoose = require('mongoose')

//Schema for authentication
const authSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: 'Users' })

//Creating mongoose model using Schema
const authModel = mongoose.model('authModel', authSchema)

//Exporting model to be used by authController.js
module.exports = authModel