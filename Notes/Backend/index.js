require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')
const logger = require('./utils/logger')

const app = express()
const PORT = process.env.PORT

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

const errorHandler = (error, request, response, next) => { logger.error('....inside the middleware'); if (error.name === 'CastError'){ return response.status(400).send({ error : ' malformated id' }) } else if (error.name === 'ValidationError') { return response.status(400).send({ error : error.message }) } next(error) }

app.use(errorHandler)
//Landing page
app.get('/',(request,response,next) => { response.send('<h1>Note web App</h1>') } )
//get all the notes
app.get('/api/notes',(request,response, next) => { Note.find({}).then((notes) => { response.json(notes) }).catch(error => { next(error) }) })
//get one note by Id
app.get('/api/notes/:id',(request,response,next) => { Note.findById(request.params.id).then((note) => { if(note){ response.json(note) } else { response.status(404).send({ error : ' object not found ' }) }}).catch(error => { next(error)}) })
//delete a note
app.delete('/api/notes/:id',(request,response, next) => { Note.findByIdAndDelete(request.params.id).then(result => { response.status(204).end() }).catch(error => { next(error) })})
//add new note
app.post('/api/notes',(request,response,next) => { const body = request.body; const note = new Note({ content : body.content, important : body.important || false } ); note.save().then((savedNote) => { response.json(savedNote) }).catch(error => { logger.info('Calling middleware'); next(error) }) })
//update a record
app.put('/api/notes/:id',(request, response, next) => { const { content , important } = request.body; Note.findByIdAndUpdate(request.params.id, { content , important } , { new : true , runValidators : true, context : 'query'  }).then( updatesRecord => { response.json(updatesRecord) }).catch( error => { next(error)})})

app.use(errorHandler)

app.listen(PORT,() => { logger.info(`Server running on ${PORT}`) })
