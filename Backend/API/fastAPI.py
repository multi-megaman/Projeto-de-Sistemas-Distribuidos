# from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

import feedparser
from feedfinder2 import find_feeds
from feedFinder import findfeed
from rssParser import generalised_parse

from fastapi.middleware.cors import CORSMiddleware

class Noticia(BaseModel):
    title: str
    link: str
    description: str
    pubDate: str
    guid: str

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
def getRSS(url: str):
    feed = generalised_parse(url)
    # feed = feedparser.parse(url)

    # feed = []
    # feedsList = find_feeds(url)
    # for findedFeed in feedsList:
    #     feed.append(feedparser.parse(findedFeed).entries)
    return {"Feed": feed}

# @app.post("/postarInfo")
# def getTitulo(noticia: Noticia):
#     return {"Titulo": noticia.title}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('fastAPI:app', host='127.0.0.1', port=8080, log_level='info')