import { useState } from 'react'
import '../styles/sideBar.css'
import rssLogo from '../assets/rss_logo.png'

function getURLName(url: string){ //Atualmente parece que não faz nada, mas no futuro pode ser útil para diminuir o tamanho de uma url muito grande
  const objUrl = new URL(url)
  return (objUrl.hostname + objUrl.pathname)
}
// TO DO: fazer com que a lista de URLs do usuário venha do backend
function SideBar({urlList, updateRSSfeed}: any) {
  const [UserURLList, setUserURLList] = useState<string[]>(urlList)
    return (
      <>
        <div id="sidebar" className='sidebar'>
          <div className="sidebar_header">
            <img src={rssLogo} className="sidebar_logo" alt="RSS Logo" />
            <h2>RSS Feed Catcher</h2>
            {/* <h3>Name Placeholder</h3> */}
          </div>

        <div className="sidebar_content">
          <ul className='user_url_list'>
          {urlList.map((url: string) => 
            <li key={url} title={url} className="user_url" onClick={() => updateRSSfeed(url,20)}>{getURLName(url)}</li>)}
          </ul>
        </div>
      
      <div className="sidebar_footer">
        <h3>Configurações da conta</h3>
      </div>
        </div>
      </>
    );
  }

export default SideBar
