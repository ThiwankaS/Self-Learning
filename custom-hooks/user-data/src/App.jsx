import { useState } from 'react'

const App = () => {

  const [name,setName] = useState('')
  const [born,setBorn] = useState('')
  const [height,setHeight] = useState('')

  return (
    <div>
      <form>
        <div>name : <input type='text'  value={name} onChange={(event) => {setName(event.target.value)}}/></div>
        <div>birthdate : <input type='text'  value={born} onChange={(event) => {setBorn(event.target.value)}}/></div>
        <div>height : <input type='text'  value={height} onChange={(event) => {setHeight(event.target.value)}}/></div>
      </form>
      <div>
        {name} | {born} | {height}
      </div>
    </div>
  )
}

export default App
