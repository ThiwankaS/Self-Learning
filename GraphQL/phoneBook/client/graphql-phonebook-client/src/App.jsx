/* eslint-disable react/prop-types */
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_PERSONS,PERSON_ADDED } from './assets/queries'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'
import { useState } from 'react'
import { updateCache } from './assets/helper'  

const App = () => {

  const [ errorMessage,setErrorMessage ] = useState(null)
  const [ token,setToken ] = useState(null)
  const client = useApolloClient()
  const result = useQuery(ALL_PERSONS)
  useSubscription(PERSON_ADDED,{
    onData : ({ data, client }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCache(client.cache, { query : ALL_PERSONS }, addedPerson)
    }
  })
  
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

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token){
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <LoginForm setError={notify} setToken={setToken} />
      </div>
    )
  }

  return (
  <div>
    <Notify errorMessage={errorMessage}/>
    <button onClick={logout}>Logout</button>
    <Persons persons={result.data.allPersons} />
    <PersonForm setError={notify}/> 
    <PhoneForm setError={notify}/>
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