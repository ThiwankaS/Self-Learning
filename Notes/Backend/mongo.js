const mongoose = require('mongoose')
const TEST_MONGODB_URL  = require('./utils/config').TEST_MONGODB_URL


mongoose.set('strictQuery',false)
mongoose.connect(TEST_MONGODB_URL)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'JS is awsome',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})