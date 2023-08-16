@echo off
cd /d %~dp0

start  cmd /k "echo API Gerenciadora de Usuarios && cd Backend/API_User_Module && npm run dev"
start  cmd /k "echo API Gerenciadora de RSS && cd Backend/API_RSS_Module && python fastAPI.py"
start  cmd /k "echo Frontend React && cd Frontend/React_frontend/ && npm run dev"
start  cmd /k "echo Prisma Studio && cd Backend/ && npx prisma studio"