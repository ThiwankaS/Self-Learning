/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import { ALL_PERSONS } from './assets/queries'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { useState } from 'react'  



const App = () => {

  const result = useQuery(ALL_PERSONS)
  const [ errorMessage,setErrorMessage ] = useState(null)

  if(result.loading){
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(()=>{
      setErrorMessage(null)
    },
    5000)
  }

  return (
  <div>
    <Notify errorMessage={errorMessage}/>
    <Persons persons={result.data.allPersons} />
    <PersonForm setError={notify}/> 
  </div>
)}

export default App

const Notify = ({ errorMessage }) => {
  if(!errorMessage){
    return null
  }
  return (
    <div style={{color : 'red'}}>{errorMessage}</div>
  )
}