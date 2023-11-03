
const logger = require('../utils/logger')
const config = require('../utils/config')
require('dotenv').config()
const mongoose = require('mongoose')


const url = config.MONGODB_URL

mongoose.set('strictQuery',false)
logger.info('connecting to DB.....')
mongoose.connect(url).then((result) => { logger.info('connection sucessful!')
}).catch((error) => { logger.info('connection error',error.message)
})

const noteSchema = new mongoose.Schema({ content : { type : String, minLength : 5, required : true }, important : Boolean })

noteSchema.set('toJSON',{ transform : (document,returnedObject) => { returnedObject.id = returnedObject._id.toString(); delete returnedObject._id; delete returnedObject.__v }
})

module.exports = mongoose.model('Note',noteSchema)