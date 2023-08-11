import { useState } from 'react'
import rssLogo from './assets/rss_logo.png'
import './App.css'

import {News} from './News'

function App() {
  const [RSSfeed, setRSSfeed] = useState<any>(null)
  const [InputRSS, setInputRSS] = useState<string>('')

  async function getRSSfeed(url: string) {

    try{
      const response = await fetch(`http://127.0.0.1:8080/getFeedFromURL?url=${url}`) // 'http://127.0.0.1:8080/getFeedFromURL?url=https%3A%2F%2Fwww.reddit.com%2Fr%2FPython%2F.rss'
      if (!response.ok) {
        alert("Erro: a API retornou uma resposta inesperada")
        return
        throw new Error("Erro: a API retornou uma resposta inesperada")
      }
        const data = await response.json()
        setRSSfeed(data.Feed)
        return data
    }catch(err){
      alert("Erro ao conectar com a API (Verifique se a API está rodando)")
      return
      throw new Error("Erro ao conectar com a API (Verifique se a API está rodando))")
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputRSS(event.target.value)
  }
  return (
    <>
      <div>
        <a href="https://pt.wikipedia.org/wiki/RSS" target="_blank">
          <img src={rssLogo} className="logo" alt="RSS Logo" />
        </a>
      </div>
      <h1>RSS Feed Catcher</h1>
      <div className="card">
        <p>ex:<br/> https://timesofindia.indiatimes.com/rssfeedstopstories.cms <br/>https://www.reddit.com/r/Python/.rss</p>
        <input placeholder='Digite uma URL' className="input" value={InputRSS} onChange={handleInputChange}></input>
        <button onClick={() => getRSSfeed(InputRSS)}>
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
