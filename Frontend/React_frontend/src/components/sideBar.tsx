import { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';
import '../styles/sideBar.css'
import rssLogo from '../assets/rss_logo.png'
import {addNewLink} from '../services/addNewLink'
import { set } from 'date-fns';

function getURLName(url: string){ //Atualmente parece que não faz nada, mas no futuro pode ser útil para diminuir o tamanho de uma url muito grande
  const objUrl = new URL(url)
  return (objUrl.hostname + objUrl.pathname)
}

// TO DO: fazer com que a lista de URLs do usuário venha do backend
function SideBar({user, links, updateRSSfeed, setUserLinks}: any) {
  // const [UserURLList, setUserURLList] = useState<string[]>([])
  const [newUrl, setNewUrl] = useState<string>('')

  async function addUrl(url: string) {
    const response = await addNewLink(url);
    if(response.error === false){
      setUserLinks([...links, url]);
    }
    else{
      alert("Erro ao adicionar URL. Por favor  tente novamente.")
    }
  }
  
  // useEffect(() => {
  //   // console.log("links: ",links)
  //   if(links ==! undefined){
  //     console.log("links: ",links)
  //     setUserURLList(links)
  //   }
  // }, [])

    return (
      <>
        <div id="sidebar" className='sidebar'>
          <div className="sidebar_header">
            <img src={rssLogo} className="sidebar_logo" alt="RSS Logo" />
            <h2>RSS Feed Catcher</h2>
            {user && (
              <h3>{user.name}</h3>
            )}
            {/* <h3>{user.name}</h3> */}
            {/* <h3>Name Placeholder</h3> */}
          </div>

        <div className="sidebar_content">
          <ul className='user_url_list'>
          {links && (
              links.map((url: string) => 
                <li key={url} title={url} className="user_url" onClick={() => updateRSSfeed(url,20)}>{getURLName(url)}</li>)
          )}
          
          </ul>
          <Popup trigger={<button className="button"> + </button>} modal>
            <div className='add_url'>
              <input placeholder='Digite a URL do Feed RSS que deseja adicionar..' className="add_url_input" onChange={(e) => setNewUrl(e.target.value)}></input>
              <button onClick={() => addUrl(newUrl)}>Adicionar</button>
            </div>
          </Popup>
        </div>
      
      <div className="sidebar_footer">
        <h3>Configurações da conta</h3>
      </div>
        </div>
      </>
    );
  }

export default SideBar
