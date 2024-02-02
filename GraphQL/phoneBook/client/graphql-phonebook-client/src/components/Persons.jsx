/* eslint-disable react/prop-types */
import { useState } from 'react'
import { gql,useQuery } from '@apollo/client'

const FIND_PERSON = gql`
    query findPersonByName ($nameToSearch : String!){
        findPerson(name : $nameToSearch){
            name,
            phone,
            id,
            address {
                street,
                city
            }
        }
    }
`

const Person = ({person,onClose}) => {
    return (
        <div>
            <h3>{person.name}</h3>
            <div>
                {person.address.street} 
                {person.address.city}
            </div>
            <div>
                {person.phone}
            </div>
            <button onClick={onClose}>close</button>
        </div>
    )
}

const Persons = ({ persons }) => {
    const [nameToSearch,setNameToSearch] = useState(null)
    const result = useQuery(FIND_PERSON,{
        variables : { nameToSearch },
        skip : !nameToSearch
    })
    if(nameToSearch && result.data) {
        return (
            <Person person={result.data.findPerson}
            onClose={()=>setNameToSearch(null)}
        />
        )
    }
    return (
        <div>
            <h3>
            Persons
            </h3>
            {persons.map(p => <div key={p.id}>
                {p.name} {p.phone}
                <button onClick={()=>setNameToSearch(p.name)}>
                    show address
                </button>
                </div>)}
        </div>
    )
}

export default Persons