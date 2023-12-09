import { useState,useEffect,useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglabale'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import NoteForm from './components/NoteForm'


const App = (props) => {

  const noteFormRef = useRef()

  const [ notes,setNotes ] = useState(null)
  const [ showAll, setShowAll ] = useState(false)
  const [ errorMessage,setErrorMessage ] = useState(null)
  const [ username,setUsername ] = useState('')
  const [ password,setPassword ] = useState('')
  const [ user,setUser ] = useState(null)
  const [ loginVisible,setLoginVisible ] = useState(false)
  //Rendering all the notes when loading for the first time
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
  },[])
  //Rendering relevant notes when user logged in for the first time
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])
  //Function to add a new note
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .creat(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }
  //Function to handle user log in
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username,password, })
      setUser(user)
      noteService.setToken(user.token)
      window.localStorage.setItem('loggedNoteappUser',JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('wrong user name or password')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }
  //Render nothing if no notes to display
  if (!notes) {
    return null
  }
  //Filter all the notes to display which has important === true
  const notesToShow = showAll ? notes : notes.filter((note) => note.important === true)
  //Function to chnage the important filed
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note,important: !note.important }

    noteService
      .update(id,changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note ' ${note.content} ' was already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
        setNotes(notes.filter(n => n.id !== id))
      })

  }

  //Function to handle user log out
  const handleLogOut = async (event) => {
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
  //Note component
  const noteForm = () => (
    <Togglable buttonLable='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote}/>
    </Togglable>
  )
  //Log out component
  const logOutForm = () => (
    <div>
      <button onClick={() => handleLogOut()}>Log Out</button>
    </div>
  )
  //Log in component
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <Togglable buttonLable='Login'>
            <LoginForm
              buttonLable='Login'
              handleSubmit={handleLogin}
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
            />
          </Togglable>
        </div>
      </div>
    )
  }

  return(
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage}/>
      <br/>
      {!user&& loginForm()}
      <br/>
      {user && <div>
        <p>{ user.name } logged in</p>
        {logOutForm()}
        {noteForm()}
      </div>}
      <br/>
      <div>
        <h3>Previuos notes</h3>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <ul>
          {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>)}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default App