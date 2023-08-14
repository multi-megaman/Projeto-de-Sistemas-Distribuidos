import { useState, useEffect } from "react";
import rssLogo from '../assets/rss_logo.png'
import '../styles/homePage.css'

import {News} from '../components/News'
import {getRSSFeedFromURL} from '../services/getRSSFeedFromURL'
import { Link } from "react-router-dom";

import { mainPageUrl } from "../globalVariables/globalVariables";

function HomePage() {
  const [RSSfeed, setRSSfeed] = useState<any>(null)
  const [InputRSS, setInputRSS] = useState<string>('')
  const [InputQnt, setQnt] = useState<number>(20)

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputRSS(event.target.value)
  }

  function handleQntInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQnt(Number(event.target.value))
  }

  async function updateRSSfeed(url: string, qnt: number) {
    const feed = await getRSSFeedFromURL(url, qnt)
    setRSSfeed(feed)
  }

return(
    <div className="homepage_content">
    <div>
        <a href="https://pt.wikipedia.org/wiki/RSS" target="_blank">
        <img src={rssLogo} className="logo" alt="RSS Logo" />
        </a>
    </div>
    <h1>RSS Feed Catcher</h1>
    <div className="card">
        <Link to={mainPageUrl}>Teste Login</Link>
        <p>
        exemplos:<br/> 
        Imagens: https://timesofindia.indiatimes.com/rssfeedstopstories.cms <br/> 
        Audio: https://rss.art19.com/apology-line <br/>
        </p>
        <input placeholder='Digite uma URL' className="input" value={InputRSS} onChange={handleInputChange}></input>
        <input type='number' placeholder='Quantidade de noticias máximas' className="input" value={InputQnt} onChange={handleQntInputChange}></input>
        <button onClick={() => updateRSSfeed(InputRSS,InputQnt )}>
        Procurar RSS Feed
        </button>
        {/* <div> */}
        {RSSfeed !== null ?
            <div>{RSSfeed.map((feed: any) => (
                <News feed={feed}
                    key={feed.link+feed.summary+feed.title}/> //Garantir que não haverá repetição de keys
            ))}
            </div>
        :
        <p>Carregando...</p>
        }
        {/* </div> */}
    </div>
    <p className="read-the-docs">
    © 2023 Multimegaman & Ant4r3z
    </p>
    </div>
)}

export default HomePage;