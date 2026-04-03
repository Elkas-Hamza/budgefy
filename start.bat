@echo off
REM Start Laravel Backend
start "Backend Laravel" cmd /k "cd /d Backend && php artisan serve --port=8000"

REM Start Vue.js Frontend
start "Vue.js Frontend" cmd /k "cd /d frontend  && npm run dev -- --port 3000"
pause
