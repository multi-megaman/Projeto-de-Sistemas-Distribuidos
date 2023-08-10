import { useState } from 'react'
import rssLogo from './assets/rss_logo.png'
import './App.css'



function App() {
  const [RSSfeed, setRSSfeed] = useState(null)

  async function getRSSfeed() {
    const response = await fetch('http://127.0.0.1:8080/getFeedFromURL?url=https%3A%2F%2Fwww.reddit.com%2Fr%2FPython%2F.rss') // TO DO: fazer o fetch com o input do usuário
    const data = await response.json()
    setRSSfeed(data.Feed)
    // data.Feed.map(feed => (
    //   feed.authors.map(author => (
    //     console.log(author.name)
    //   )
    //   )
    // ))
    return data
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
            <div>{RSSfeed.map(feed => (
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
