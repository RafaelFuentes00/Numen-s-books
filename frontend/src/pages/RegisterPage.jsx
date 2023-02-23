import React, { useState } from 'react'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { useContext } from 'react'
import UserContext from '../context/user/UserContext'
import UserService from '../services/UserService'

const RegisterPage = () => {
  const {user, setUser} = useContext(UserContext)
  const [invalidFields, setInvalidFields] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const navigate = useNavigate()

  const inputUsername = useRef(null)
  const inputName = useRef(null)
  const inputSurname = useRef(null)
  const inputEmail = useRef(null)
  const inputPassword = useRef(null)
  const inputConfirm = useRef(null)


  const registerUser = async (params)=>{
    if(inputConfirm.current.value===params.password){
      const data = await UserService.getUserByUsername(params.username)
      if(data!==null){
        setInvalidFields(true)
        setErrorMsg("El usuario ya existe")
      }else{
        UserService.new(params)
        setUser(params)
        navigate("/login")
      }
      
    }else{
      setInvalidFields(true)
      setErrorMsg("Parametros inválidos")
    }

  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(inputUsername.current.value=="" | inputName.current.value=="" | inputSurname.current.value=="" | inputEmail.current.value=="" | inputPassword.current.value==""){
      setInvalidFields(true)
      setErrorMsg("Parametros inválidos")
    }else{
      const data = {
      "username": inputUsername.current.value,
      "name": inputName.current.value,
      "surname": inputSurname.current.value,
      "email": inputEmail.current.value,
      "password": inputPassword.current.value
    }
    registerUser(data);
    }
    
  }
  
  return (
    <div className='register-container'>
      <form autoComplete='off' onSubmit={(e)=>handleSubmit(e)}>
            {
              invalidFields===true ? 
              <div className='login-labels'>
              <TextField className='user-label' label="Usuario" variant="standard" type="text" inputRef={inputUsername} error></TextField><br />
              <TextField className='user-label' label="Nombre" variant="standard" type="text" inputRef={inputName} error></TextField><br />
              <TextField className='user-label' label="Apellidos" variant="standard" type="text" inputRef={inputSurname} error></TextField><br />
              <TextField className='user-label' label="Email" variant="standard" type="text" inputRef={inputEmail} error></TextField><br />
              <TextField className='user-label' label="Contraseña" variant="standard" type="password" inputRef={inputPassword} error></TextField><br />
              <TextField className='user-label' label="Confirmar contraseña" variant="standard" type="password" inputRef={inputConfirm} error></TextField>
              <p className='error'>{errorMsg}</p>
              </div>:<div className='login-labels'>
              <TextField className='user-label' label="Usuario" variant="standard" type="text" inputRef={inputUsername} ></TextField><br />
              <TextField className='user-label' label="Nombre" variant="standard" type="text" inputRef={inputName} ></TextField><br />
              <TextField className='user-label' label="Apellidos" variant="standard" type="text" inputRef={inputSurname} ></TextField><br />
              <TextField className='user-label' label="Email" variant="standard" type="text" inputRef={inputEmail} ></TextField><br />
              <TextField className='user-label' label="Contraseña" variant="standard" type="password" inputRef={inputPassword} ></TextField><br />
              <TextField className='user-label' label="Confirmar contraseña" variant="standard" type="password" inputRef={inputConfirm} ></TextField>
              </div>
            }
            <p>Ya tienes una cuenta? <Link to="/login">Inicia sesión ahora!</Link></p>
            <Button variant="contained" type="submit">Registrarse</Button>
        </form>
    </div>
  )
}

export default RegisterPage