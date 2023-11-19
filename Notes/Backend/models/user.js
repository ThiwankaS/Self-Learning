const { truncate } = require('lodash')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true
  },
  name : String,
  passwordHash : String,
  note : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Note'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON',{
  transform : (document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash //Password should not be reveal
  }
})

const User = mongoose.model('User',userSchema)

module.exports = User