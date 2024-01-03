import { useState } from 'react'

const Home = () => (
  <div>
    <h2> TKL notes app </h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>
)

const Notes = () => (
  <div><h2> Notes </h2></div>
)

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

  const [page,setPage] = useState('home')

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'home'){
      return <Home />
    } else if ( page === 'notes'){
      return <Notes />
    } else if (page === 'users') {
      return <User />
    }
  }

  const padding = {
    padding : 5
  }

  return (
    <div>
      <div>
        <a href='' onClick={toPage('home')} style={padding}>home</a>
        <a href='' onClick={toPage('notes')} style={padding}>notes</a>
        <a href='' onClick={toPage('users')} style={padding}>users</a>
      </div>
      {content()}
    </div>
  )
}

export default App
