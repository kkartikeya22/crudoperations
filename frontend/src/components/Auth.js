import React, { useState } from 'react'
import api from '../api'

const Auth = () => {
    const [username,setUsername]= useState('')
    const [password,setPassword] = useState('')

    const register = async()=>{
        try{
            await api.post('/auth/register',{username,password})
            alert('User registered')
        }
        catch(e){
            alert(e.response.data)
        }
    }

    const login = async(response) =>{
        try{
            await api.post('/auth/login',{username,password})
            localStorage.setItem('token',response.data.token)
            alert('User registered')
        }
        catch(e){
            alert(e.response.data)
        }
    }

    return (
    <div>
      <h2>Authentication</h2>
      <input type="text" name={username} value={username} onChange={(e)=>setUsername(e.target.value)}/>
      <input type="password" name={password} value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Auth
