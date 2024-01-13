/* eslint-disable react/prop-types */
import { useState } from 'react'
import {  Routes, 
          Route, 
          Link, 
          Navigate,  
          useNavigate, 
          useMatch 
  } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`
const Input = styled.input`
  margin: 0.25em;
`
const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`
const Alert = styled.span`
background: LightGreen;
padding: 0.2em;
margin-top: 0.2em;
`

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
        <div>username <Input type='text'/></div>
        <div>password <Input type='password'/></div>
        <div><Button type='submit'>login</Button></div>
      </form>
    </div>
  )
}

const App = ()  => {
  const [user,setUser] = useState(null)
  const [notes,setNotes] = useState(initialNotes)
  const [message, setMessage] = useState(null)
  

  const match = useMatch('/notes/:id')
  const note = match
                ? notes.find(note => note.id === Number(match.params.id))
                : null

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const padding = {
    padding : 5
  }

  

  return (
    <Page>
        {(message &&
          <Alert variant="success">
            {message}
          </Alert>
        )}
        <Navigation>
          <Link style={padding} to='/'>home</Link>
          <Link style={padding} to='/notes'>notes</Link>
          <Link style={padding} to='/users'>users</Link>
          {user 
            ? <em>{user} logged in </em>
            : <Link style={padding} to='/login'>login</Link>
          }
        </Navigation>
        <Routes>
          <Route path='/'       element={<Home />}/>
          <Route path='/notes'  element={<Notes notes={notes}/>} />
          <Route path='/users'  element={user ? <User /> : <Navigate replace to='/login' />} />
          <Route path='/notes/:id' element={<Note note={note}/>} />
          <Route path='/login' element={<Login onLogin={login}/>} />
        </Routes>
      <Footer>
          <br />
          <em>Note app, Department of Computer Science 2024</em>
      </Footer>
    </Page>
  )
}

export default App
