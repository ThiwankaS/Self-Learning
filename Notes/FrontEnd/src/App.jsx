import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'

const App = (props) => { 

  const [ notes,setNotes ] = useState(null)
  const [ newNote,setNewNote] = useState('') 
  const [ showAll, setShowAll ] = useState(false) 
  const [ errorMessage,setErrorMessage ] = useState(null)
  const [ username,setUsername ] = useState('')
  const [ password,setPassword ] = useState('')
  const [ user,setUser ] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
        .then(initialNotes => setNotes(initialNotes))
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])
  
  const addNote = (event) => {
    event.preventDefault() 
    const noteObject = {
      content : newNote, 
      important : Math.random() > 0.5
    }

    noteService
      .creat(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })

  }

  const handelLogin = async (event) => {
    event.preventDefault()
    try{
        const user = await loginService.login({ username,password, })
        setUser(user)
        noteService.setToken(user.token)
        window.localStorage.setItem('loggedNoteappUser',JSON.stringify(user))
        setUsername('')
        setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  if (!notes) {
    return null
  }

  const notesToShow = showAll ? notes : notes.filter((note)=> note.important === true)

  const handelNoteChange = (event) => {
      setNewNote(event.target.value) 
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note,important: !note.important}

    noteService
      .update(id,changedNote)
        .then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
         })
        .catch(error => {
          setErrorMessage(
            `Note ' ${note.content} ' was already removed from the server`
          )
          setTimeout(()=>{
            setErrorMessage(null)
           },5000)
          setNotes(notes.filter(n => n.id !== id))
         })

  }

const handelLogOut = async (event) => {
  try{
      setUser(null)
      noteService.setToken(user.token)
      window.localStorage.removeItem('loggedNoteappUser')
      setUsername('')
      setPassword('')
  } catch(exception) {
    setErrorMessage('Opps! Something went wrong')
    setTimeout(() => {
      setErrorMessage(null)
    },5000)
  }
}

const loginForm = () => (
    <form onSubmit={handelLogin}>
      <h3>Login</h3>
        <div>
          Username : <input 
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({target}) => setUsername(target.value)}
                      />
        </div>
        <div>
          Password : <input 
                        type="text"
                        value={password}
                        name="Password"
                        onChange={({target}) => setPassword(target.value)}
                      />
        </div> 
      <button type='submit'>Login</button>        
    </form>
)

const noteForm = () => (
    <div>
        <form onSubmit={addNote}>
        <h3>Add new note</h3>
          <input value={newNote} onChange={handelNoteChange}/>
          <button type="submit">Save</button>
      </form>
    </div>
)

const logOutForm = () => (
  <div>
    <button onClick={()=>handelLogOut()}>Log Out</button>
  </div>
)

  return(
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage}/>
      <br/>
      {!user&& loginForm()}
      <br/>
      {user && <div>
                <p>{ user.username } logged in</p>
                {logOutForm()}
                {noteForm()}
              </div>}
      <br/>
      <div>
        <h3>Previuos notes</h3>
        <div>
            <button onClick={()=>setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all'}
            </button>
        </div>
        <ul>
          {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={()=> toggleImportanceOf(note.id)}/>)}
        </ul>
      </div>
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