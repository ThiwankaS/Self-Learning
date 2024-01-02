import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CounterContexProvider } from './CounterContex.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CounterContexProvider>
    <App />
  </CounterContexProvider>
)