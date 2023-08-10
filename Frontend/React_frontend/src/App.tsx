import { useState } from 'react'
import rssLogo from './assets/rss_logo.png'
import './App.css'



function App() {
  const [RSSfeed, setRSSfeed] = useState<any>(null)

  async function getRSSfeed() {
    //Tradando um possivel erro de conexão com a API
    try{
      const response = await fetch('http://127.0.0.1:8080/getFeedFromURL?url=https%3A%2F%2Fwww.reddit.com%2Fr%2FPython%2F.rss') // TO DO: fazer o fetch com o input do usuário
      //tratando um possivel erro de resposta da API
      if (!response.ok) {
        alert("Erro: a API retornou uma resposta inesperada")
        throw new Error("Erro: a API retornou uma resposta inesperada")
        return
      }
        const data = await response.json()
        setRSSfeed(data.Feed)
        return data
    }catch(err){
      alert("Erro ao conectar com a API (Verifique se a API está rodando)")
      throw new Error("Erro ao conectar com a API (Verifique se a API está rodando))")
      return
    }

  }
  return (
    <>
      <div>
        <a href="https://pt.wikipedia.org/wiki/RSS" target="_blank">
          <img src={rssLogo} className="logo" alt="RSS Logo" />
        </a>
      </div>
      <h1>RSS Feed Cather</h1>
      <div className="card">
        <button onClick={() => getRSSfeed()}/*onClick={() => setRSSfeed((RSSfeed) => RSSfeed + 1)}*/>
          Procurar RSS Feed
        </button>
        <div>
          {RSSfeed !== null ?
            <div>{RSSfeed.map((feed: any) => (
              <p>Titulo: {feed.title} <br></br>Autor: {feed.author} <br></br> Link: <a href={feed.link}>Link</a> <br></br> Publicacao: {feed.published}</p>
              ))
            }</div>
           :
           <p>Carregando...</p>
           }

          {/* {RSSfeed} */}
        </div>
        {/* <p>
          Feito por <code>Everton & Joyce</code>
        </p> */}
      </div>
      <p className="read-the-docs">
      © 2023 Multimegaman & Ant4r3z
      </p>
    </>
  )
}

export default App
