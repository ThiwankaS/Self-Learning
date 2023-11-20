
const logger = require('../utils/logger')
const config = require('../utils/config')
require('dotenv').config()
const mongoose = require('mongoose')


const url = config.MONGODB_URL

mongoose.set('strictQuery',false)

/*mongoose.connect(url).then((result) => {
  logger.info('connection sucessful! + here still inside note Js!')
}).catch((error) => {
  logger.info('connection error',error.message)
})*/

const noteSchema = new mongoose.Schema({
  content : {
    type : String,
    minLength : 5,
    required : true
  },
  important : Boolean,
  user : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    }
  ],
})

noteSchema.set('toJSON',{ transform : (document,returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
}
})

const Note = mongoose.model('Note',noteSchema)

module.exports = Note