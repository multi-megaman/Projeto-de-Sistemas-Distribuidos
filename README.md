# Projeto de Sistemas Distribuidos
 
## Para instalar todas as dependências da API do Feed RSS (FastAPI): 
Tendo o python e o pip instalados:

```$ cd diretorio/do/projeto``` <br>
```$ pip install -r requirements.txt```
#### Recomendo, se possivel, criar um ambiente virtual com o anaconda e utilizar o python 3.9

## Para instalar todas as dependências da API de gerenciamento de usuário (Express) & da base de dados (Prisma):
Baixar o [NPM](https://nodejs.org/en/download) <br>
```$ cd diretorio/do/projeto/Backend/``` <br>
```$ npm install``` <br>

## Para instalar todas as dependências do Frontend (React):
Baixar o [NPM](https://nodejs.org/en/download) <br>
```$ cd diretorio/do/projeto/Frontend/React_frontend``` <br>
```$ npm install``` <br>

<hl>

# Para iniciar o Sistema Distribuido inteiro, basta executar o arquivo ```auto_start.bat``` se você estiver utilizando o Windows 

<hl>

## Caso queira iniciar módulo por módulo, siga os passos abaixo:

## Para iniciar a API do Feed RSS:
### Via linha de código
```$ cd diretorio/do/projeto``` <br>
```$ python ./Backend/API_RSS_Module/fastAPI.py```
### Ou com o uvicorn (para desenvolvimento apenas)
```$ cd diretorio/do/projeto/Backend/API``` <br>
```$ uvicorn fastAPI:app --reload```

## Para iniciar a API de gerenciamento de usuário:
### Via linha de código
```$ cd diretorio/do/projeto/Backend/API_User_Module``` <br>
```$ npm run dev```

## Para iniciar o React Frontend:
```$ cd diretorio/do/projeto/Frontend/React_frontend``` <br>
```$ npm run dev```