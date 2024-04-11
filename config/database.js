/**
 * @description - Database config file
 */

const mongoose = require('mongoose')
require('dotenv').config();
const logger = require('./logger')

//Database URI
const mongoDB_URI = process.env.DATABASE_URI
const DB_CONNECTION_TIMEOUT = process.env.DB_CONNECTION_TIMEOUT
const DB_NAME = process.env.DB_NAME
const DB_MIN_POOL_SIZE = process.env.DB_MIN_POOL_SIZE
const DB_MAX_POOL_SIZE = process.env.DB_MAX_POOL_SIZE

//Connection instance
let mongoInstance = null

// Setting up mongoose connection
const createConnection = async () => {
    try {
        const conn = await mongoose.connect(mongoDB_URI, {
            connectTimeoutMS: DB_CONNECTION_TIMEOUT,
            dbName: DB_NAME,
            minPoolSize: DB_MIN_POOL_SIZE, //Creating a connection pool
            maxPoolSize: DB_MAX_POOL_SIZE
        });
        
        logger.logsInto.log('info','Connected to MongoDB') 
        console.log('Connected to MongoDB')
      
        return conn

    } catch (error) {

        logger.logsInto.log('error','Error at creating MongoDB connection : database.js : '+  error) 
        
    }
}

//Using singleton pattern to ensure there's only one reference to the mongoose connection pool to avoid overhead.
const getInstance = () => {

    if(!mongoInstance){
        mongoInstance = createConnection()
    }
    return mongoInstance
}

module.exports = {
    getInstance
}