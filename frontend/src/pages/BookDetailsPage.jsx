import React, { useEffect, useState } from 'react'
import Header from '../components/commons/Header'
import { useParams } from 'react-router-dom'

const BookDetailsPage = () => {
    const { idBook } = useParams()
    const [book, setBook] = useState([])
    const [author, setAuthor] = useState("")
    const [category, setCategory] = useState("")


    const getBook = async (id)=>{
        const res = await fetch(`http://localhost:8800/books/${id}`)
        const data = await res.json()
        setBook(data)
    }
    const getAuthor = async (id)=>{
        const res = await fetch(`http://localhost:8800/users/${id}`)
        const data = await res.json()
        if(data.surname){
            setAuthor(data.name + " "+ data.surname)
        }else{
            setAuthor(data.name)
        }
       
    }
    const getCategory = async (id)=>{
        const res = await fetch(`http://localhost:8800/categories/${id}`)
        const data = await res.json()
        setCategory(data.name)
    }

    useEffect(()=>{
        getBook(idBook)
    },[])
    useEffect(()=>{
        getAuthor(book.author)
        getCategory(book.category)
    },[book])

  return (
    <>
    <Header/>
    <main>
        <div className='bookDetail-card'>
            <div>
                <img src={`http://localhost:8800/books/covers/${book.cover ? book.cover:"no-image.png"}`} alt="" />
                <h2>{book.title}</h2>
                <p>Escrito por {author}</p>
                <p>Categoria: {category}</p></div>
            <div className='bookDetail-desc'>
                <h2>Resumen</h2>
                <p>{book.description}</p>
            </div>
        </div>
    </main>
    </>
  )
}

export default BookDetailsPage