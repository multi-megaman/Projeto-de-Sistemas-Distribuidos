# from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

import json
import random
import schedule
import time
import datetime
import requests

from feedfinder2 import find_feeds

from fastapi.middleware.cors import CORSMiddleware
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

"""
            emails = fetch_user_emails(url)
            notify_All(emails, entry)
"""

@app.get("/listener")
def listener():

    getLinks = "http://localhost:3000/getLink" 
    response = requests.get(getLinks)

    if response.status_code == 200:
        # Parseie o JSON obtido da API
        data = response.json()
        url_list = data.get("link", [])
        
        for link in url_list:
            newUpdates = requests.get("http://localhost:8080/fetchNewUpdates",
                params={
                    "url": link
                }
            )
    
    else:
        print("Falha ao obter o JSON da API")
    

def schedule_listener():
    
    schedule.every(20).minutes.do(listener)
    while True:
        schedule.run_pending()
        time.sleep(1)

def run_fastapi_server():
    uvicorn.run('fastAPI:app', host='127.0.0.1', port=8000, log_level='info')


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

