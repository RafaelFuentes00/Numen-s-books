import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import UserContext from '../context/user/UserContext'

const AddBookPage = () => {
    const {user} = useContext(UserContext)
    const [categories, setCategories] = useState([])
    const [InvalidFields, setInvalidFields] = useState(false)

    const navigate = useNavigate()

    const inputCover = useRef(null)
    const inputTitle = useRef(null)
    const inputDesc = useRef(null)
    const inputCategory = useRef(null)


    let formData = new FormData();

    const AddBook = async(e)=>{
        e.preventDefault()
        if(inputCategory.current.value == "" | inputTitle.current.value == "" | inputDesc.current.value == ""){
            setInvalidFields(true)
        }else{
            setInvalidFields(false)
            formData.append('title', inputTitle.current.value)
            formData.append('description', inputDesc.current.value)
            formData.append('author', user._id)
            formData.append('category', inputCategory.current.value)
            formData.append('date', Date.now())
            const options = {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: formData,
            };
            try {
                const response = await fetch('http://localhost:8800/books', options);
                navigate(-1)
            } catch (error) {
                console.log(error);
            }
        }
        
    }

    const onFileChange =(e)=>{
        if(e.target && e.target.files[0]){
            formData.append('file', e.target.files[0])
            console.log(formData.get("author"), formData.get("file"));
        }
    }


    const getCategories = async ()=>{
        const res = await fetch('http://localhost:8800/categories')
        const data = await res.json()
        setCategories(data)
    }
    useEffect(()=>{
        getCategories()
    },[])
  return (
    <div>
        <FaArrowLeft className='FaArrowLeft' onClick={e=>navigate(-1)}/>
        <form className='AddBookForm' onSubmit={e=>AddBook(e)}>
            <input className='AddBookForm-title' placeholder='Añade el titulo de tu libro' type="text" ref={inputTitle}/>
            <textarea className='AddBookForm-desc' ref={inputDesc} placeholder="Añade un breve resumen sobre de lo que trata el libro"/>
            <select className='AddBookForm-cat' ref={inputCategory}>
                <option value="">{`--Selecciona la categoria--`}</option>
                {categories.map(e=><option key={e._id} value={e._id} >{e.name}</option>)}
            </select>
                {/* <input name="file" accept='image/png, .jpeg, .jpg' type="file" onChange={onFileChange}/> */}
                <p className='error'>{InvalidFields===true && "*Todos los campos son obligatorios" }</p>
            <button className='AddBookForm-add' type='submit'>Añadir a la biblioteca</button>
        </form>
    </div>
  )
}

export default AddBookPage