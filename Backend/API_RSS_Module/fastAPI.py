# from typing import Union

from fastapi import FastAPI, Depends, HTTPException, Request
from starlette.responses import JSONResponse
from pydantic import BaseModel
from typing import List

import json
import random
import datetime
import requests

import feedparser
from feedfinder2 import find_feeds
from feedFinder import findfeed
from rssParser import generalised_parse

from fastapi.middleware.cors import CORSMiddleware

# class Noticia(BaseModel):
#     title: str
#     link: str
#     description: str
#     pubDate: str
#     guid: str

app = FastAPI()

#CORS, para permitir requisições de outros domínios
origins = [
    "http://localhost",
    "http://localhost:5173", #Frontend do React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("")
def read_root():
    return {"Projeto": "SD"}

#URL de teste: https://www.reddit.com/r/Python/.rss
@app.get("/getFeedFromURL")
def getRSS(url: str, qnt: int | None = None):
    feed = generalised_parse(url)
    if qnt is not None and qnt > 0:
        if qnt != None:
            if qnt > len(feed):
                qnt = len(feed)
            feed = feed[:qnt]
    #TO DO: Fazer o findfeed funcionar
    # feed = []
    # feedsList = find_feeds(url)
    # for findedFeed in feedsList:
    #     feed.append(feedparser.parse(findedFeed).entries)
    # print(feed)
    return {"Feed": feed}

@app.post("/getFeedFromList")
def getRSSList(urlList: List[str]):
    qnt = 20
    feed = []
    for url in urlList:
        #Pegar apenas as 5 primeiras notícias de cada feed
        feed += generalised_parse(url)[:5]
    if qnt is not None and qnt > 0:
        if qnt != None:
            if qnt > len(feed):
                qnt = len(feed)
            feed = feed[:qnt]
    #Embaralha a ordem das notícias
    # random.shuffle(feed)
    return {"Feed": feed}


def updates_to_notify_package(data):
    url = data.get("url")
    news = data.get("news", [])

    print(data)

    # Fetch emails dos usuários que têm o link cadastrado
    getEmails = requests.get("http://localhost:3000/getEmailsByLink", json={"url": url})
    getEmails.raise_for_status()  
    emails_data = getEmails.json()
    emails_list = emails_data.get("emails", [])

    for entry in news:
        notify_all_url = "http://localhost:3001/notifyAll"
        response = requests.post(notify_all_url, json={"emailsList": emails_list, "entry": entry})
        response.raise_for_status() 

    return "Notificação enviada"

@app.get("/fetchNewUpdates")
def fetch_new_updates(url: str):
    news = getRSS(url, 10)
    updates = []
    last_fetch = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(minutes=30)

    for entry in news["Feed"]:
        # Obtenha a data de publicação da notícia 
        published = entry.get("published", '')
        try:
            fetched_now = datetime.datetime.strptime(published, "%a, %d %b %Y %H:%M:%S %z")
        except ValueError:
            fetched_now = None

        # Compare a data da notícia com a data da última chegagem 
        if fetched_now is not None and fetched_now > last_fetch:
            updates.append(entry)
    
    response = {
        "url": url,
        "news": updates
    }

    updates_to_notify_package(response)


if __name__ == '__main__':
    import uvicorn
    import threading

    uvicorn.run('fastAPI:app', host='127.0.0.1', port=8080, log_level='info')

