import React, { useEffect, useState } from 'react'
import Header from '../components/commons/Header'

const LastPublishedPage = () => {
  const [news, setNews] = useState([])

  const getNews = async ()=>{
    const res = await fetch('http://localhost:8000/api/news')
    const data = await res.json()
    setNews(data)
  }
  useEffect(()=>{
    getNews()
  },[])
  return (
    <>
    <Header/>
    <main>
      <div>
        <h2>Echale un vistazo a las últimas noticias!</h2>
        <div>
          {
            news.map(e=>
              <div className='news-card' key={e.id}>
                <h2>{e.title}</h2>
                <p>{e.body}</p>
              </div>
              )
          }
        </div>
      </div>
    </main>
    </>
  )
}

export default LastPublishedPage