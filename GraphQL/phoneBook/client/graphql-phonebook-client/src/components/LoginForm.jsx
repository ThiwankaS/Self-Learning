/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../assets/queries'

const LoginForm = ({ setError, setToken }) => {
    const [ username, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ login,result ] = useMutation(LOGIN,{
        onError : (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    useEffect(()=>{
        if(result.data){
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('phonenumbers-user-token',token)
        }
    },[result.data,setToken])

    const sumbit = async (event) => {
        event.preventDefault()
        login({ variables : { username,password }})
    }

    return(
        <div>
            <form onSubmit={sumbit}>
                <div>
                    username : 
                    <input name='userName' type='text' value={username} onChange={({ target }) => setUserName(target.value)} />
                </div>
                <div>
                    password : 
                    <input name='passowrd' type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm