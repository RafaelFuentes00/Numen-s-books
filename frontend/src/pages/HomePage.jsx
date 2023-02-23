import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/commons/Header'
import UserContext from '../context/user/UserContext'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const {user} = useContext(UserContext)

  return (
    <>
      <Header/>
      <main>
        <h2 className='home-welcome'> {user.username!==null ? <>¡{user.name}, te damos la bienvenida!</>:<>¡Bienvenido a Numen's books!</>}</h2>
        <Link className='toBooks-link' to="/books">  
          <div className='toBooks-card'>
            <div>
              <h2>¿Quieres ver nuestros libros?</h2>
              <div>
                <p>¡Aquí podrás ver nuestra gran librería! Además de poder leer los libros que tú quieras cuando y como quieras.</p> 
                <p>También podrás buscar por las diferentes categorías de libros, ¡tenemos una amplia variedad! Así que no te lo pienses más y haz que comience tu aventura a través de los diferentes mundos que te aguardan en los libros.</p>
              </div>
            </div>
            <img className='toBooks-image' src="/libros.jpg" alt="" />
          </div>
        </Link>
        <Link className='toNews-link' to="/last_published">
          <div className='toNews-card'>
            <img className='toNews-image' src="/noticia.jpeg" alt="" />
            <div>
              <h2>¿Porqué no le echas un vistazo a las últimas noticias?</h2>
              <div>
                <p>¡No te pierdas las últimas noticias a nivel mundial de tus escritores o libros favoritos!</p> 
                <p>Entra a ver las noticias de última hora y entérate de lo que ocurre a tu alrededor para estar al tanto de nuevos libros.</p>
                <p>¡Tampoco te olvides de revisarlo por si alguna nueva promesa literaria aparece! Aquí nos enteramos de todo así que... !No te lo pierdas!</p>
              </div>
            </div>
          </div>
        </Link>
        </main>
    </>
  )
}

export default HomePage