import { useState, useEffect } from "react";
import rssLogo from '../assets/rss_logo.png'
import '../App.css'
import '../styles/mainPage.css'

import {News} from '../components/News'
// import SideBar from '../components/sideBar/sideBar';
import {getRSSFeedFromURL} from '../services/getRSSFeedFromURL'
import {getLoggedUserInfos} from '../services/getLoggedUserInfos'
import SideBar from "../components/sideBar";
import Cookies from "js-cookie";
import { set } from "date-fns";




function MainPage() {
  const [RSSfeed, setRSSfeed] = useState<any>(null)
  const [userData, setUserData] = useState<any>({})
  const [userLinks, setUserLinks] = useState<string[]>([])



  
  async function initUserInfos(){
    //transformando o cookie em um json

    const  userInfos = await getLoggedUserInfos(Cookies.get("user"));
    setUserData(JSON.parse(userInfos.user));
    // console.log("userInfos: ", JSON.parse(userInfos.user));
    setUserLinks(JSON.parse(userInfos.links));
    console.log("userLinks: ", JSON.parse(userInfos.links));

    return userInfos;
  }

  useEffect(() => {


    //se o Cookie não existir, redirecionar para a home page
    if(Cookies.get("user") === undefined){
      window.location.href = "/";
    }

    initUserInfos();
  }, [])

  async function updateRSSfeed(url: string, qnt: number) {
    const feed = await getRSSFeedFromURL(url, qnt)
    setRSSfeed(feed)
  }
  return (
    <div className="mainPage_content">
      {/* SideBar */}
      <SideBar user={userData} link={userLinks} updateRSSfeed={updateRSSfeed}/>
      
      {/* Content */}
      <div className="user_content">
        {RSSfeed !== null ?
              <div className="feed_rss">
              {RSSfeed.map((feed: any) => (
                  <News feed={feed}
                      key={feed.link+feed.summary+feed.title}/> //Garantir que não haverá repetição de keys
              ))}
              </div>
          :
          <p>Carregando...</p>
        }
      </div>
    </div>
  )
}

export default MainPage
