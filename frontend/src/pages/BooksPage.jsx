import React, { useContext, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Header from '../components/commons/Header'
import UserContext from '../context/user/UserContext'

const BooksPage = ()=> {
  const {user} = useContext(UserContext)
  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [query, setQuery] = useState("")
  const [queryCat, setQueryCat] = useState("")

  const handleSearch = (e)=>{
    setQuery(e.target.value)
    getFilteredBooks()
  }
  const handleSearchCategory = (e)=>{
    setQueryCat(e.target.value)
    console.log(e.target.value);
    getFilteredBooks()
  }

  const getFilteredBooks = ()=>{
    setFilteredBooks(books.filter(e=>e.title.toLowerCase().includes(query.toLowerCase())).filter(e=>e.category._id.includes(queryCat)))
  }
  const getCategories = async ()=>{
    const res = await fetch("http://localhost:8800/categories")
    const data = await res.json()
    setCategories(data)
  }


  const getBooks = async ()=>{
    const res = await fetch("http://localhost:8800/books")
    const data = await res.json();
    setBooks(data)
    getFilteredBooks()
  }

  const deleteBook = async (id)=>{
    const options = {
      method: "DELETE"
    }
    await fetch(`http://localhost:8800/books/${id}`, options)
  }
  useEffect(()=>{
    getCategories()
  },[])

  useEffect(()=>{
    getBooks()
  },[books])

  return (
    <>
      <Header/>
      <main>
        <div className='search'>
          <input onChange={handleSearch}/>
          <select onChange={handleSearchCategory}>
            <option value="">Todas</option>
            {
              categories.map(e=><option key={e._id} value={e._id}>{e.name}</option>)
            }
          </select>
        </div>
        <div className='books-grid'>
          {
            filteredBooks.length!==0 ? filteredBooks.map((e)=>
            <div key={e._id}>
              { user.rol === "ADMINISTRATOR" ? <FaTrash color='red' onClick={event=>deleteBook(e._id)}/>:""}
              <Link className='book-card' to={`/books/${e._id}`}>
                <div className='book-card'>
                  <div className='cover'><img className='coverImage' src={`http://localhost:8800/books/covers/${e.cover ? e.cover:"no-image.png"}`} alt="" /></div>
                  <div className='book-card-title'>{e.title}</div>
                </div>
              </Link>
            </div>
              ):<div>No ha habido suerte.</div>
          }
        </div>
      </main>
    </>
  )
}

export default BooksPage