import { useState } from "react"

const NoteForm = ({ createNote }) => {

    const [ newNote,setNewNote] = useState('') 

    const addNote = (event) => {
        event.preventDefault() 
        createNote({
            content : newNote, 
            important : true
        }) 
        setNewNote('')
    }   
    return(
        <div>
            <form onSubmit={addNote}>
                <h3>Add new note</h3>
                <input value={newNote} onChange={event => setNewNote(event.target.value)}/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default NoteForm