import { useState, useEffect } from "react";
import rssLogo from '../assets/rss_logo.png'
import '../App.css'
import '../styles/mainPage.css'

import {News} from '../components/News'
// import SideBar from '../components/sideBar/sideBar';
import {getRSSFeedFromURL} from '../services/getRSSFeedFromURL'
import {getLoggedUserInfos} from '../services/getLoggedUserInfos'
import SideBar from "../components/sideBar";
import { set } from "date-fns";




function MainPage() {
  const [UserURLList, setUserURLList] = useState<string[]>([])
  const [RSSfeed, setRSSfeed] = useState<any>(null)
  const [Username, setUsername] = useState<string>("")

  
  async function initUserInfos(request: any){
    const userInfos = await getLoggedUserInfos(request);
    setUserURLList(userInfos.links);
    setUsername(userInfos.username);
    return userInfos;
  }

  useEffect(() => {
    // const urlListResponse = async () =>{
    //  const response =  await FillUrlList("teste");
    //  return response;
    // }

    // const response = urlListResponse();
    initUserInfos("response")
  }, [])

  async function updateRSSfeed(url: string, qnt: number) {
    const feed = await getRSSFeedFromURL(url, qnt)
    setRSSfeed(feed)
  }
  return (
    <div className="mainPage_content">
      {/* SideBar */}
      <SideBar urlList={UserURLList} updateRSSfeed={updateRSSfeed}/>
      
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
