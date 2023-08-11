import { useState } from 'react'
import rssLogo from './assets/rss_logo.png'
import './App.css'

import {News} from './News'

function App() {
  const [RSSfeed, setRSSfeed] = useState<any>(null)

  async function getRSSfeed() {

    try{
      const response = await fetch('http://127.0.0.1:8080/getFeedFromURL?url=https%3A%2F%2Ftimesofindia.indiatimes.com%2Frssfeedstopstories.cms') // TO DO: fazer o fetch com o input do usuário 'http://127.0.0.1:8080/getFeedFromURL?url=https%3A%2F%2Fwww.reddit.com%2Fr%2FPython%2F.rss'
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
        <button onClick={() => getRSSfeed()}>
          Procurar RSS Feed
        </button>
        <div>
          {RSSfeed !== null ?
            <div>{RSSfeed.map((feed: any, i: number) => (
                <News title={feed.title} 
                      author={feed.author} 
                      summary={feed.summary} 
                      link={feed.link} 
                      imageLink={feed.enclosure} 
                      published={feed.published} 
                      key={feed.link}/>
              ))}
            </div>
           :
           <p>Carregando...</p>
           }
        </div>
      </div>
      <p className="read-the-docs">
      © 2023 Multimegaman & Ant4r3z
      </p>
    </>
  )
}

export default App
