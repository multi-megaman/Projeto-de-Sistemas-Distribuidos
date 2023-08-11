import React from 'react'; // we need this to make JSX compile
import './News.css'

import { parse, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {utcToZonedTime} from 'date-fns-tz'

import rssLogo from './assets/rss_logo.png'
import audio from './assets/audio.gif'
import { mediaTypes } from './mediaTypes';

// type NewsProp = {
//   title: string,
//   author: string,
//   summary: string,
//   link: string,
//   mediaLink: string,
//   enclosureLink: string,
//   published: string
// }

function htmlParser(htmlString: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const textContent = doc.documentElement.textContent || '';
  return textContent
}

function dateParser(date: string) {
  const dateParsed = parse(date, 'EEE, dd MMM yyyy HH:mm:ss XXXX', new Date()) //"Fri, 11 Aug 2023 02:02:25 +0530"
  const zonedDate = utcToZonedTime(dateParsed, 'America/Sao_Paulo');
  const dateParsedFormatted = format(zonedDate, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
  return dateParsedFormatted
}

function sliceString(string: string, length: number) {
  if (string.length > length) {
    return string.slice(0, length) + '...'
  }
  return string
}

function linkParser(link: string) {
  if (link === '') {
    return "#"
  }
  return link
}

function checkMediaContent(feed: any, types: Map<string, string>) {
  // TO DO: Capturar o header do link e verificar se é um arquivo de imagem, video ou audio
  try{
    // const url = new URL(feed.media)
    // const extension = url.pathname.split(".")[1]
    let mediaSource: string
    let mediaType: string
    if (feed.media === '') {
      mediaSource = feed.enclosure
      mediaType = feed.enclosure_type
    }
    else {
      mediaSource = feed.media
      mediaType = feed.media_type
    }

    const extension = mediaType.split("/")[0]
    console.log(extension)

    if (extension == "image") {
      return <img src={mediaSource} className="newsImage"></img>
    }
    if (extension == "video") {
      return <video src={mediaSource} className="newsImage"></video>
    }
    if (extension == "audio") {
      return <div className='newsImage'>
              <img src={audio} className="newsImageForAudio"></img>
              <audio controls className="audioController">
                <source src={mediaSource} type="audio/mpeg"></source>
              </audio>
             </div>
    }
      // return <img src={(mediaLink)} className="newsImage"></img>
      return <img src={rssLogo} className="newsImage"></img>

  } catch(err) {
    return <img src={rssLogo} className="newsImage"></img>
  }
  
}

export const News = ({feed}: any) => 

<div className="newsBody">
  
  <a href={linkParser(feed.link)} target="_blank">
  <div className='newsImageContainer'>
    {/* <img src={mediaLinkParser(mediaLink)} className="newsImage" key={link + "_media"}></img> */}
    {checkMediaContent(feed, mediaTypes)}
  </div>
  
  <div className="NewsInfosContainer">
    <div className='Newstitle' title ={htmlParser(feed.title)}>{sliceString(htmlParser(feed.title),100)}</div>
    <div className="NewsSummary" title={htmlParser(feed.summary)}>{sliceString(htmlParser(feed.summary),200)}</div>
    <div className="NewsFooter">
      <div className="NewsAuthor">{feed.author}</div>
      <div className="NewsDate">{(feed.published)}</div>
    </div>

  </div>
  </a>
</div>

