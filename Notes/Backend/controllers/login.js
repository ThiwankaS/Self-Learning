//login router
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

//get the user

loginRouter.post('/', async (request,response) => {
  const { username , password } = request.body
  const user = await User.findOne({ username })

  //check for password
  const passwordCorrect = user === null
    ? false
    : bcrypt.compare(password,user.passwordHash)
  //If incorrect -> 401
  if(!(user && passwordCorrect)){
    return response.status(401).json({
      error : 'Invalid username or password'
    })
  }
  //create user for token
  const userForToken = {
    username : user.username,
    id : user._id
  }
  //sign in
  const token = jwt.sign(userForToken,process.env.SECRET,{ expiresIn : 60*60 })
  response
    .status(200)
    .send({  token,username : user.username, name : user.name })
})
//export router


module.exports = loginRouter