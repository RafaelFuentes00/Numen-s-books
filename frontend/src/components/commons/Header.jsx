import React, { useEffect, useState } from 'react'
import { Link, useNavigate, use } from 'react-router-dom'
import UserContext from '../../context/user/UserContext'
import { useContext } from 'react'
import { FaUser, FaSignOutAlt} from 'react-icons/fa'
import Logout from '../Logout'


const Header = () => {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()

    const [logOutClass, setLogOutClass] = useState("handleLogOut hidden")

    const handleLogOut = ()=>{
      setUser(null)
      navigate("/login")
    }

    const logOut =()=>{
      setLogOutClass("handleLogOut")
    }

    const toProfile =()=>{
      navigate("/profile")
    }
    
    const userIsNull = ()=>{
      if(user.username===null){
        navigate("/login")
      }
    }

    const getLocalUser =()=>{
      const localUser = localStorage.getItem("user")
      setUser(localUser)
      console.log(localUser)
    }
    useEffect(()=>{
      // userIsNull()

    },[user])

  return (
    <><header>
      <div className='logo-grid'><img className='logo' src='/NumenLogo.png'/><label className='title'>Numen's Books</label></div>
        <nav>
            <Link className='link' to="/home">Inicio</Link>
            <Link className='link' to="/last_published">Últimas novedades</Link>
            <Link className='link' to="/books">Descubrir</Link>
        </nav>
        <div>
          <div className='user-buttons'>
          {user.username===null ? <>
            <label className='FaUser' onClick={e=>navigate("/login")}>
              Login
            </label></>
          :
            <>
            <label className='FaUser' onClick={e=>toProfile()}>
              <FaUser /> {user.username}
            </label>
            <FaSignOutAlt className='FaSignOutAlt' onClick={e=>logOut()}/></>
          
}       </div>
        </div>
        
    </header>
    <Logout handleLogOut={handleLogOut} logOutClass={logOutClass} setLogOutClass={setLogOutClass}/>
    </>
  )
}

export default Header