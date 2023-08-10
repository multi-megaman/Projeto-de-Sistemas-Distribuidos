# from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

import feedparser
from feedfinder2 import find_feeds
from feedFinder import findfeed

class Noticia(BaseModel):
    title: str
    link: str
    description: str
    pubDate: str
    guid: str

app = FastAPI()

@app.get("")
def read_root():
    return {"Projeto": "SD"}

#URL de teste: https://www.reddit.com/r/Python/.rss
@app.get("/getFeedFromURL")
def getRSS(url: str):
    feed = feedparser.parse(url)
    # feed = []
    # feedsList = find_feeds(url)
    # for findedFeed in feedsList:
    #     feed.append(feedparser.parse(findedFeed).entries)
    return {"Feed": feed.entries}

# @app.post("/postarInfo")
# def getTitulo(noticia: Noticia):
#     return {"Titulo": noticia.title}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run('fastAPI:app', host='127.0.0.1', port=8080, log_level='info')