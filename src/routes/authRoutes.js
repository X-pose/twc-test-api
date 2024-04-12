/**
 * @description - Route file responsible for the authentication process
 */

//Requires
const express = require('express')
const router = express.Router()
const { register, login } = require('../services/authService')

router.post('/register', async (req, res) => {
    await register(req, res)
})

router.post('/login', async (req, res) => {
    await login(req, res)
})

//Exporting router to be used by the app.js
module.exports = router