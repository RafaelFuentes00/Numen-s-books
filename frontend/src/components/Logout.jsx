import { Button } from '@mui/material'
import React, { useState } from 'react'

const Logout = ({handleLogOut, logOutClass, setLogOutClass}) => {
    const cancel = ()=>{
        setLogOutClass("handleLogOut hidden")
    }
  return (
    <div className={logOutClass}>
        <div className='logOutMsg'>
            <p>Estas seguro de que quieres cerrar sesión?</p>
            <Button variant="outlined" onClick={e=>handleLogOut()}>Sí</Button>
            <Button variant="contained" onClick={e=>cancel()}>No</Button>
        </div>
    </div>
  )
}

export default Logout