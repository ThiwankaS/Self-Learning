const mongoose = require('mongoose')


const url = 'mongodb+srv://thivankas:BnUTL6aLiVHJKAmD@cluster0.fbgbcsu.mongodb.net/testNoteApp?retryWrites=true&w=majority'

mongoose.set('strictQuery',false)
mongoose.connect(url)

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