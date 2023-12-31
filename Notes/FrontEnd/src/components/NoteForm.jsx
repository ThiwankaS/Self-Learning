import { useState } from 'react'

const NoteForm = ({ createNote }) => {

  const [ newNote,setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content : newNote,
      important : true
    })
    setNewNote('')
  }
  return(
    <div className='formDiv'>
      <h3>Create a new note</h3>
      <form onSubmit={addNote}>
        <input id='new-note' value={newNote} onChange={handleChange} placeholder='write note content here'/>
        <button id='save-button' type="submit">Save</button>
      </form>
    </div>
  )
}

export default NoteForm