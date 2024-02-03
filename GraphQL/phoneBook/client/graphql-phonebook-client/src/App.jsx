/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import { ALL_PERSONS } from './assets/queries'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'



const App = () => {

  const result = useQuery(ALL_PERSONS)

  if(result.loading){
    return <div>loading...</div>
  }

  return (
  <div>
    <Persons persons={result.data.allPersons} />
    <PersonForm /> 
  </div>
)}

export default App