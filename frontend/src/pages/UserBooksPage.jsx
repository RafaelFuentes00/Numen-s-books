import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/user/UserContext'

const UserBooksPage = () => {
    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])
    const {user} = useContext(UserContext)
    const [userID, setUserID] = useState('')

    const navigate = useNavigate()

    const getBooks= async()=>{
        const response = await fetch("http://localhost:8800/books") 
        const data = await response.json()
        setUserID(user._id)
        const dataBooks = data.filter(e=> e.author._id.includes(userID))
        setBooks(dataBooks)
    }
    const getCategories = async ()=>{
        const response = await fetch("http://localhost:8800/categories")
        const data = await response.json()
        setCategories(data)
    }
    useEffect(()=>{
        getCategories()
    },[])

    useEffect(()=>{
        getBooks()
    },[books])

  return (
    <div>
        
            <FaArrowLeft className='FaArrowLeft' onClick={e=>navigate(-1)}/>
        <main>
            <Link to={`/${user.username}/books/add`}>+Añadir</Link>
            <div>
                <h4>Tus libros</h4>
                {
                    books.length!==0 ?  books.map(e=><div key={e._id}><p>{e.title}</p></div>):"Aún no tienes libros publicados"
                }
            </div>
        </main>
    </div>
  )
}

export default UserBooksPage