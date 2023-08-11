import React from 'react'; // we need this to make JSX compile
import './News.css'

import { parse, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {utcToZonedTime} from 'date-fns-tz'

import rssLogo from './assets/rss_logo.png'
import audio from './assets/audio.gif'
import { mediaTypes } from './mediaTypes';

type NewsProp = {
  title: string,
  author: string,
  summary: string,
  link: string,
  imageLink: string,
  published: string
}

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

function checkMediaContent(mediaLink: string, types: Map<string, string>) {
  try{
    const url = new URL(mediaLink)
    const extension = url.pathname.split(".")[1]

    if (types.get(extension) == "img") {
      return <img src={mediaLink} className="newsImage"></img>
    }
    if (types.get(extension) == "video") {
      return <video src={mediaLink} className="newsImage"></video>
    }
    if (types.get(extension) == "audio") {
      return <div className='newsImage'>
              <img src={audio} className="newsImageForAudio"></img>
              <audio controls className="audioController">
                <source src={mediaLink} type="audio/mpeg"></source>
              </audio>
             </div>
    }
      // return <img src={(mediaLink)} className="newsImage"></img>
      return <img src={rssLogo} className="newsImage"></img>

  } catch(err) {
    return <img src={rssLogo} className="newsImage"></img>
  }
  
}

export const News = ({title, author, summary, link, imageLink, published }: NewsProp) => 

<div className="newsBody">
  
  <a href={linkParser(link)} target="_blank">
  <div className='newsImageContainer'>
    {/* <img src={imageLinkParser(imageLink)} className="newsImage" key={link + "_media"}></img> */}
    {checkMediaContent(imageLink, mediaTypes)}
  </div>
  
  <div className="NewsInfosContainer">
    <div className='Newstitle' title ={htmlParser(title)}>{sliceString(htmlParser(title),100)}</div>
    <div className="NewsSummary" title={htmlParser(summary)}>{sliceString(htmlParser(summary),200)}</div>
    <div className="NewsFooter">
      <div className="NewsAuthor">{author}</div>
      <div className="NewsDate">{(published)}</div>
    </div>

  </div>
  </a>
</div>

