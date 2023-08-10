# Projeto de Sistemas Distribuidos
 
## Para instalar todas as dependências da API:
Tendo o python e o pip instalados:

```$ cd diretorio/do/projeto``` <br>
```$ pip install -r requirements.txt```
#### Recomendo, se possivel, criar um ambiente virtual com o anaconda e utilizar o python 3.9

## Para instalar todas as dependências do Frontend:
Baixar o [NPM](https://nodejs.org/en/download) <br>
```$ cd diretorio/do/projeto/Frontend/React_frontend``` <br>
```$ npm install``` <br>

## Para iniciar a API:
### Via linha de código
```$ cd diretorio/do/projeto``` <br>
```$ python ./Backend/API/fastAPI.py```
### Ou com o uvicorn (para desenvolvimento apenas)
```$ cd diretorio/do/projeto/Backend/API``` <br>
```$ uvicorn fastAPI:app --reload```

## Para iniciar o React Frontend:
```$ cd diretorio/do/projeto/Frontend/React_frontend``` <br>
```$ npm run dev```