@echo off
REM UNA Zdrava Hrana - Development Server Launcher

title UNA Zdrava Hrana - Dev Server

echo.
echo ============================================================
echo          UNA ZDRAVA HRANA - WEBSITE DEVELOPMENT
echo ============================================================
echo.

cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/2] Installing dependencies...
    call npm install
    echo.
) else (
    echo [1/2] Dependencies already installed
    echo.
)

echo [2/2] Starting development server...
echo.
echo Website will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ============================================================
echo.

call npm run dev

pause
