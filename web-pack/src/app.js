import axios from 'axios'
import React , { useEffect, useState } from 'react'
import './index.css'

const useNotes = (url) => {
    const [notes,setNotes] = useState([])
    useEffect((() => {
        axios.get(url).then(response => setNotes(response.data))
    }),[url])
    return notes
}

const App = () => {
    const [counter,setCounter] = useState(0) 
    const [valus,setValus] = useState([])
    const notes = useNotes(BACKEND_URL)

    const handleClick = () => {
        setCounter(counter + 1)
        setValus(valus.concat(counter))
    }
    return (
        <div className='container'>
            Hello web-pack {counter} clicks
            <button onClick={handleClick}>press</button>
            <div>{notes.length} notes on server {BACKEND_URL} </div>
        </div>
        
    )
}

export default App