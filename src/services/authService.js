/**
 * @description - Authentication related business logic handled here
 * @functionality - extract JSON payload, setting response header, handling business logic, and setting up JWT tokens
 */
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createUser, getUserByEmail } = require('../controllers/userController')
const saltCount = 10;
const HttpStatus = require('../enums/httpStatus')
require('dotenv').config();

//Hasing the password added data privacy & security
const hashPasswordGen = async (plainPsw) => {
    const hashPsw = await bcryptjs.hash(plainPsw, saltCount);
    return hashPsw;

};

exports.register = async (req, res) => {

    const payload = req.body
    const hashedPassword = await hashPasswordGen(payload.password);

    //Constructing the new user payload
    const newUser = {
        email: payload.email,
        password: hashedPassword
    }

    //Registering the user with createUser function in userController.js
    const response = await createUser(newUser)

    //Auto-login the user upon successful registration to the system.
    if(response.status === HttpStatus.CREATED){
        await this.login(req,res)
    }else{
        res.status(response.status).json(response.body)
    }

}

exports.login = async (req, res) => {

    const payload = req.body

    const foundUser = await getUserByEmail(payload.email)

    if (foundUser.status === HttpStatus.OK) {
        const retrivedUser = foundUser.body

        //Once the user is found in the system check for password matching to validate the user 
        const checkPswMatch = await bcryptjs.compare(payload.password, retrivedUser.password)

        //if password matches, authenticate the user with JWT Token
        if (checkPswMatch === true) {

            //Setting up the JWT token. Contains userID. Expires in 3 hours
            const JWTtoken = jwt.sign({ userId: retrivedUser._id }, process.env.JWT_SECRET, { expiresIn: '3h' })

            //Setting the response header with OK and dispatching the JWT Token in a JSON body
            res.status(HttpStatus.OK).json({ TWCtoken: JWTtoken })
        } else {
            //If password didn't match, unauthorize the login request
            res.status(HttpStatus.UNAUTHORIZED).json({ body: "User authentication failed!" })
        }

    } else {
        //if user not found sets request headers to unauthorized and sends authentication failed message to the client 
        res.status(HttpStatus.UNAUTHORIZED).json({ body: "User authentication failed!" })
    }


}