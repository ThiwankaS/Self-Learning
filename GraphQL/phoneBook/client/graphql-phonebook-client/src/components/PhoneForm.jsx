import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_PERSONS, EDIT_NUMBER } from '../assets/queries'

const PhoneForm = () => {
    const [ name,setName ] = useState('')
    const [ phone,setPhone ] = useState('')

    const [ changeNumber ] = useMutation(EDIT_NUMBER)

    const submit = (event) => {
        event.preventDefault()
        changeNumber({
            variables : { name, phone },
            refetchQueries : [ { query : ALL_PERSONS }]
        })
        setName('')
        setPhone('')
    }

    return (
       <div>
            <h3>change number </h3>
            <form onSubmit={submit}>
                <div>
                    name : 
                    <input value={name} onChange={({target})=>setName(target.value)} />
                </div>
                <div>
                    phone : 
                    <input value={phone} onChange={({target})=>setPhone(target.value)} />
                </div>
                <button type='submit'>
                    change number
                </button>
            </form>
       </div>
    )
}

export default PhoneForm