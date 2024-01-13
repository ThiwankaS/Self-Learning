import React , { useState } from 'react'
import './index.css'

const App = () => {
    const [counter,setCounter] = useState(0) 
    const [valus,setValus] = useState([])

    const handleClick = () => {
        setCounter(counter + 1)
        setValus(valus.concat(counter))
    }
    return (
        <div className='container'>
            Hello web-pack {counter} clicks
            <button onClick={handleClick}>press</button>
        </div>
        
    )
}

export default App