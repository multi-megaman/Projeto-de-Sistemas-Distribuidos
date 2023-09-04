# from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

import json
import schedule
import time
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

# @app.post("/postarInfo")
# def getTitulo(noticia: Noticia):
#     return {"Titulo": noticia.title}
    
def fetch_new_updates(url: str, last_fetch):

    updates = getRSS(url, 10)

    for entry in updates["Feed"]:
        # Obtenha a data de publicação da notícia 
        published = entry.get("published", '')

        try:
            fetched_now = datetime.datetime.strptime(published, "%a, %d %b %Y %H:%M:%S %z")
        except ValueError:
            fetched_now = None

        # Compare a data da notícia com a data da última chegagem 
        if fetched_now is not None and fetched_now > last_fetch:

            
            print(entry.get("title", ''))

            emails = fetch_user_emails(url)
            notify_All(emails, entry)


def fetch_user_emails(url: str):
    
    # Notificação por email
    getUsers = "http://localhost:3000/getLinkUsers" 
    response1 = requests.get(getUsers, json={"url": url})

    if response1.status_code == 200:
        # Parseie o JSON obtido da API
        usersJson = response1.json()
        
        getUsersEmails = "http://localhost:3000/getUsersEmails" 
        response2 = requests.get(getUsersEmails, json=usersJson)

        if response2.status_code == 200:
            # Parseie o JSON obtido da API
            data = response2.json()
            emails_list = data.get("emails", [])

            return emails_list

def notify_All(emails, entry):
    
    print(emails)

    for email in emails:

        data = {
            "email": email,
            'title': entry.get('title', ''),
            'summary': entry.get('summary', ''),
            'link': entry.get('link', ''),
        }
        requests.post("http://localhost:3001/notify", json=data)
        print(email)
    
    print("Usuários notificados!")
    

@app.get("/listener")
def listener():

    getLinks = "http://localhost:3000/getLink" 
    response = requests.get(getLinks)

    if response.status_code == 200:
        # Parseie o JSON obtido da API
        data = response.json()
        url_list = data.get("link", [])
        
        last_fetch = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(minutes=20)

        for link in url_list:
            fetch_new_updates(link, last_fetch)
    
    else:
        print("Falha ao obter o JSON da API")


def schedule_listener():
    
    schedule.every(20).minutes.do(listener)

    while True:
        schedule.run_pending()
        time.sleep(1)

def run_fastapi_server():
    uvicorn.run('fastAPI:app', host='127.0.0.1', port=8080, log_level='info')


if __name__ == '__main__':
    import uvicorn
    import threading

    # Inicie o servidor FastAPI em uma thread separada
    fastapi_thread = threading.Thread(target=run_fastapi_server)
    fastapi_thread.start()

    # Inicie o listener do schedule em uma thread separada
    schedule_thread = threading.Thread(target=schedule_listener)
    schedule_thread.start()

    # Aguarde até que as threads sejam encerradas (por exemplo, pressionando Ctrl+C)
    fastapi_thread.join()
    schedule_thread.join()

