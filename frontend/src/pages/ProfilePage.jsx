import React, { useContext, useRef, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import { TextField, Button } from '@mui/material'
import UserService from '../services/UserService'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const ProfilePage = () => {
    const {user, setUser} = useContext(UserContext)
    const [change, setChange] = useState(false)

    const navigate = useNavigate()

    const inputUsername = useRef(null)
    const inputName = useRef(null)
    const inputSurname = useRef(null)
    const inputEmail = useRef(null)
    const inputPassword = useRef(null)

    const updateChanges=()=>{
      let data = null
      if(inputPassword.current.value===""){
        data = {
          "_id": user._id,
          "username": user.username,
          "name": inputName.current.value,
          "surname": inputSurname.current.value,
          "email": inputEmail.current.value,
        }
      }else{
        data = {
          "_id": user._id,
          "username": user.username,
          "name": inputName.current.value,
          "surname": inputSurname.current.value,
          "email": inputEmail.current.value,
          "password": inputPassword.current.value
        }
      }     
      UserService.update(data)
      console.log(data)
      setUser(data)
      setChange(false)
    }

    const userIsNull = ()=>{
      if(user.username===null){
        navigate("/login")
      }
    }
    useEffect(()=>{
      // userIsNull()
      
    },[])
  return (
    <>
    <div>
      <FaArrowLeft onClick={e=>navigate(-1)} className='FaArrowLeft'/>
              {
                change===false ? 
                <div className='profile-fields'>
                  { user.rol==="ADMINISTRATOR" ? <div><label>{user.rol}</label><br /></div>:""}
                  <TextField variant="standard" type="text" defaultValue={user.username} inputProps={{readOnly:true,}} ></TextField><br />
                  <TextField variant="standard" type="text" defaultValue={user.name} inputProps={{readOnly:true,}}></TextField><br />
                  <TextField variant="standard" type="text" defaultValue={user.surname} inputProps={{readOnly:true,}}></TextField><br />
                  <TextField variant="standard" type="text" defaultValue={user.email} inputProps={{readOnly:true,}}></TextField><br />
                  <TextField variant="standard" type="password" placeholder="password" inputProps={{readOnly:true,}}></TextField>
                  <br />
                  <Button onClick={e=>setChange(true)}>Cambiar datos</Button>
                </div>:<div  className='profile-fields'>
                  { user.rol==="ADMINISTRATOR" ? <><label>{user.rol}</label><br /></>:""}
                  <TextField variant="standard" type="text" inputRef={inputUsername} defaultValue={user.username} inputProps={{readOnly:true,}}></TextField><br />
                  <TextField variant="standard" type="text" inputRef={inputName} defaultValue={user.name}></TextField><br />
                  <TextField variant="standard" type="text" inputRef={inputSurname} defaultValue={user.surname} ></TextField><br />
                  <TextField variant="standard" type="text" inputRef={inputEmail} defaultValue={user.email}></TextField><br />
                  <TextField variant="standard" type="password" inputRef={inputPassword} placeholder="password"></TextField><br />
                  <Button onClick={e=>updateChanges()}>Guardar</Button>
                  <Button onClick={e=>setChange(false)}>Cancelar</Button>
                </div>
              }

              <div className='toUserBooks'>
                <Link to={`/${user.username}/books`}>Mis libros</Link>
              </div>
    </div>
    </>
  )
}

export default ProfilePage