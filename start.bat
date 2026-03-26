@echo off
REM Start Laravel Backend
start "Symfony Backend Laravel" cmd /k "cd /d Backend && php artisan serve --port=9002"

REM Start Vue.js Frontend
start "Vue.js Frontend" cmd /k "cd /d frontend  && npm run dev -- --port 9000"
pause
