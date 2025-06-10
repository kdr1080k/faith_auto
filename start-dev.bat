@echo off
echo Starting FlexCar development servers...

:: Kill any existing node processes
taskkill /F /IM node.exe >nul 2>&1

:: Start frontend
start cmd /k "npm run dev:frontend"

:: Wait a moment
timeout /t 2 /nobreak >nul

:: Start backend
start cmd /k "npm run dev:backend"

echo Development servers started!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:8080 