/**
 * @description - Entry point to the Express server 
 */

//Imports and requires
const AppExpress = require('express')
const cors = require('cors')
const app = AppExpress()
const appRouter = AppExpress.Router()
const connectDB = require('./config/database')

//Requires - Route classes 
const authRoutes = require('./src/routes/authRoutes')
const contactRoutes = require('./src/routes/contactRoutes')

//Establishing MongoDB connection
connectDB.getInstance()


const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:4173"
]
//Mounting middlewares to API calls 
app.use(
    cors({
        origin: allowedOrigins
    })
)

app.use(AppExpress.json())
app.use('/', appRouter)

//Set routes
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)

//Exporting app to be used by the server.js
module.exports = app