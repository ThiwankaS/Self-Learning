/* eslint-disable react/prop-types */
import { useState } from 'react'
import {  Routes, 
          Route, 
          Link, 
          Navigate,  
          useNavigate, 
          useMatch 
  } from 'react-router-dom'


const initialNotes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
    user: 'Matti Luukkainen'
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
    user: 'Matti Luukkainen'
  },
  {
    id: 3,
    content: 'Most important methods of HTTP-protocol are GET and POST',
    important: true,
    user: 'Arto Hellas'
  }
]

const Home = () => (
  <div>
    <h2> TKTL notes app </h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>
)

const Notes = ({notes}) => (
  
  <div>
    <h2> Notes </h2>
    <ul>
      {notes.map(note => <li key={note.id}>
        <Link to={`/notes/${note.id}`}>{note.content} </Link>
        </li>)}
    </ul>
  </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h4>{note.content}</h4>
      <div>{note.user}</div>
      <div><strong>{note.important ? ' important ' : ' '}</strong></div>
    </div>
  )
}


const User = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }
  
  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>username <input type='text'/></div>
        <div>password <input type='password'/></div>
        <div><button type='submit'>login</button></div>
      </form>
    </div>
  )
}

const App = ()  => {
  const [user,setUser] = useState(null)
  const [notes,setNotes] = useState(initialNotes)
  

  const match = useMatch('/notes/:id')
  const note = match
                ? notes.find(note => note.id === Number(match.params.id))
                : null

  const login = (user) => {
    setUser(user)
  }

  const padding = {
    padding : 5
  }

  

  return (
    <div>
        <div>
          <Link style={padding} to='/'>home</Link>
          <Link style={padding} to='/notes'>notes</Link>
          <Link style={padding} to='/users'>users</Link>
          {user 
            ? <em>{user} logged in </em>
            : <Link style={padding} to='/login'>login</Link>
          }
        </div>
        <Routes>
          <Route path='/'       element={<Home />}/>
          <Route path='/notes'  element={<Notes notes={notes}/>} />
          <Route path='/users'  element={user ? <User /> : <Navigate replace to='/login' />} />
          <Route path='/notes/:id' element={<Note note={note}/>} />
          <Route path='/login' element={<Login onLogin={login}/>} />
        </Routes>
      <footer>
          <br />
          <em>Note app, Department of Computer Science 2024</em>
      </footer>
    </div>
  )
}

export default App
