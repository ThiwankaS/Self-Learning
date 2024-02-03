import { gql,useMutation } from '@apollo/client'
import { useState } from 'react'

const CREATE_PERSON = gql`
    mutation createPerson (
        $name : String!,
        $phone : String!,
        $street : String!,
        $city : String!,
    ){
        addPerson(
            name : $name,
            phone : $phone,
            street : $street,
            city : $city
        ){
            name,
            phone,
            address {
                street,
                city
            },
            id
        }
    }
`

const PersonForm = () => {
    const [ name,setName ] = useState('')
    const [ phone,setPhone ] = useState('')
    const [ street,setStreet ] = useState('')
    const [ city,setCity ] = useState('')

    const [ createPerson ] = useMutation(CREATE_PERSON)

    const submit = (event) => {
        event.preventDefault()
        createPerson({
            variables : {name,phone,street,city}
        })
        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={submit}>
                <div>
                    name 
                    <input value={name} onChange={({target}) => setName(target.value)} />
                </div>
                <div>
                    phone
                    <input value={phone} onChange={({target}) => setPhone(target.value)} />
                </div>
                <div>
                    street
                    <input value={street} onChange={({target}) => setStreet(target.value)} />
                </div>
                <div>
                    city
                    <input value={city} onChange={({target}) => setCity(target.value)} />
                </div>
                <button type='submit'>add!</button>
            </form>
        </div>
    )
}

export default PersonForm