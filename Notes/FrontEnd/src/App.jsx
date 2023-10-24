import { useEffect, useState } from 'react';
import Note from './components/Note';
import axios from 'axios';
import noteServices from './services/notes'; 



const App = (props) => { 

  const [ notes,setNotes ] = useState(null); 
  const [ newNote,setNewNote] = useState(''); 
  const [ showAll, setShowAll ] = useState(false); 
  const [ errorMessage,setErrorMessage ] = useState(null);

  useEffect(() => {
    noteServices.getAll().then(initialNotes => setNotes(initialNotes));
  },[]); 
  
  const addNote = (event) => {
    event.preventDefault(); 
    const noteObject = {
      content : newNote, 
      important : Math.random() > 0.5
    }

    noteServices.creat(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote(''); 
    })

  }

  if (!notes) {
    return null; 
  }

  const notesToShow = showAll ? notes : notes.filter((note)=> note.important === true); 

  const handelNoteChange = (event) => {
      setNewNote(event.target.value); 
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = {...note,important: !note.important};

    noteServices.update(id,changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote));
    }).catch(error => {
      setErrorMessage(
        `Note ' ${note.content} ' was already deleted from the server`
      )
      setTimeout(()=>{
        setErrorMessage(null);
      },5000)
      setNotes(notes.filter(n => n.id !== id))
    })

  }

  return(
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={()=>setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={()=> toggleImportanceOf(note.id)}/>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handelNoteChange}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App; 

const Notification = ({message}) => {
  if (message === null){
    return null; 
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}