@echo off
set "PATH=%LOCALAPPDATA%\Programs\node;C:\Users\Rafi\.local\bin\node_portable\node-v20.18.0-win-x64;%PATH%"
cd /d "%~dp0"
echo ========================================================
echo   Krishi Shongjog (AgroConnect BD) - Dev Server
echo ========================================================
echo.
echo Starting Vite server...
echo The app will open in your default browser at http://localhost:5173
echo.
start http://localhost:5173
npm run dev
pause
