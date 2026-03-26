@echo off
REM Start Backend laravel
start "Symfony Backend laravel" cmd /k "php artisan serve--port=9002"
REM Start Frontend
start "vue js frontend" cmd /k "npm run dev"
pause