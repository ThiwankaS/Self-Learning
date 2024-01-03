import { useState } from 'react'
import { BrowserRouter as Router, 
         Routes, Route, Link, useParams
} from 'react-router-dom'

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

const Note = ({notes}) => {
  const id = useParams().id
  const note = notes.find(n => n.id === Number(id))
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

const App = ()  => {
  
  const [notes,setNotes] = useState([
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
  ])

  const padding = {
    padding : 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/notes'>notes</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>
      <Routes>
        <Route path='/'       element={<Home />}/>
        <Route path='/notes'  element={<Notes notes={notes}/>} />
        <Route path='/users'  element={<User />} />
        <Route path='/notes/:id' element={<Note notes={notes}/>} />
      </Routes>
      <div>
        <i>Note app, Department of Computer Science 2023</i>
      </div>
    </Router>
  )
}

export default App
