const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/note')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
logger.info('Connecting to DB...')
mongoose.connect(config.MONGODB_URL).then(() => logger.info('Connection : Successfull')).catch(error => logger.error('Connection : Unsuccessfull -> ',error.message))

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)


app.use('/api/notes',notesRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
