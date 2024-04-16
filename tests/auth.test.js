/**
 * @description - Test suite for authentication services functions
 */
const { login, register } = require('../src/services/authService')


const { createUser,getUserByEmail } = require('../src/controllers/userController')
jest.mock('../src/controllers/userController')


//Request object body
const req = {
    body: {
        email:"testmail36@gmail.com",
        password:"twctst123456"
    }
}

//Mocking the response object
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
}

// Set the mock behavior for createUser & getUserByEmail
createUser.mockResolvedValue({ status: 201 }) 
getUserByEmail.mockResolvedValue({status:200, body:{password:"$2a$10$n26vVshJKXOtS2qvxu4aAe3luUGxzxKfHNAdolhHVpUkVCaodoKWK"}})

//Login test
test('Unit test - login function', async () => {
  
    await login(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
})

//Register test
test('Unit test - register function', async()=>{
    
    await register(req,res)
    expect(res.status).toHaveBeenCalledWith(200)
})

//finally clearing the mocks
jest.clearAllMocks()

