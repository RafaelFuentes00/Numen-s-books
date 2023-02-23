import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { useState, useEffect, useRef } from 'react'
import { useContext } from 'react'
import UserContext from '../context/user/UserContext'
import UserService from '../services/UserService'

const LoginPage = () => {
    const {user, setUser} = useContext(UserContext);
    const [invalidFields, setInvalidFields] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const inputUsername = useRef(null)
    const inputPassword = useRef(null)
    const navigate = useNavigate(); 

    const loginUser = async (params)=>{
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      };

      try{
        if(!(params.username && params.password)){
          setInvalidFields(true)
          setErrorMsg("Todos los campos son obligatorios")
        }else{
          const response = await fetch("http://localhost:8800/login", options);
        const data = await response.json();
        if(data!=="invalid"){
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
          navigate("/home")
        }else{
          setInvalidFields(true)
          setErrorMsg("Parametros inválidos")
        }
        }
        
      }catch(error){
        console.log(error)
      }
    }

    const handleSubmit = (e)=>{
      e.preventDefault();
      const data = {
        "username": inputUsername.current.value,
        "password": inputPassword.current.value
      }
      loginUser(data);
    }
  return (
    <div className='login-container'>
        <form autoComplete='off' onSubmit={(e)=>handleSubmit(e)}>
            {
              invalidFields===true ? 
              <div className='login-labels'>
              <TextField className='user-label' label="Usuario" variant="standard" type="text" inputRef={inputUsername} error></TextField><br />
              <TextField className='user-label' label="Contraseña" variant="standard" type="password" inputRef={inputPassword} error></TextField>
              <p className='error'>{errorMsg}</p>
              </div>:
              <div className='login-labels'>
              <TextField className='user-label' label="Usuario" variant="standard" type="text" inputRef={inputUsername} ></TextField><br />
              <TextField className='user-label' label="Contraseña" variant="standard" type="password" inputRef={inputPassword} ></TextField>
              </div>
            }
            <p>Aun no te has registrado? <Link to="/register">Hazlo aqui!</Link></p>
            <Button variant="contained" type="submit">Iniciar Sesión</Button>
        </form>
    </div>
  )
}

export default LoginPage