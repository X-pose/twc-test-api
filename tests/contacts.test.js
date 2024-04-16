/**
 * @description - Test suite for authentication services functions
 */

const contactService = require('../src/services/contactService')
const {createContact,updateContact,getAllContacts,deleteContact} = require('../src/controllers/contactController')
const {verifyToken} = require('../src/services/jwtService')

jest.mock('../src/controllers/contactController')
jest.mock('../src/services/jwtService')

//Request object body
const req = {
    
    body: {
        fullName:"test user1",
        email:'testmail@gmail.com',
        phoneNumber:'0700000000',
        gender:"Male"
    }
}

const paramReq = {
    params:{id:'661d4af1fcba3e65b91c053a'},
    body: {
        fullName:"Kanthi perera",
        email:'testmail@gmail.com',
        phoneNumber:'0700000000',
        gender:"Female"
    }
}

//Mocking the response object
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
}

// Set the mock behavior for createContact, updateContact,getAllContact,deleteContact, and verifyToken functions
createContact.mockResolvedValue({status:201})
updateContact.mockResolvedValue({status:200})
getAllContacts.mockResolvedValue({status:200, body:[{'item': 1},{'item' : 2}]})
deleteContact.mockResolvedValue({status:200})
verifyToken.mockResolvedValue({status:200})

//Add contact function
test('Unit test - addContact function', async()=>{

    await contactService.addContact(req,res)
    expect(res.status).toHaveBeenCalledWith(201)
})

//Add contact function
test('Unit test - updateContact function', async()=>{

    await contactService.updateContact(paramReq ,res)
    expect(res.status).toHaveBeenCalledWith(200)
})

//Get all contacts function
test('Unit test - getAllContacts function', async()=>{

    await contactService.getAllContacts(req,res)
    expect(res.status).toHaveBeenCalledWith(200)
})

//Delete contact function
test('Unit test - deleteContact function', async()=>{

    await contactService.deleteContact(paramReq ,res)
    expect(res.status).toHaveBeenCalledWith(200)
})

//finally clearing the mocks
jest.clearAllMocks()

