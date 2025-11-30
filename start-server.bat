@echo off
REM EcoTrack Web Server Starter
REM This script starts a local web server to view the EcoTrack website

echo Starting EcoTrack Web Server...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python to start server...
    echo Open your browser and go to: http://localhost:8000
    echo.
    python -m http.server 8000
) else (
    REM Check if Node.js is installed
    node --version >nul 2>&1
    if %errorlevel% == 0 (
        echo Using Node.js to start server...
        echo Open your browser and go to: http://localhost:8000
        echo.
        npx http-server
    ) else (
        echo.
        echo ERROR: Neither Python nor Node.js found on your system.
        echo.
        echo Please install one of the following:
        echo - Python: https://www.python.org/downloads/
        echo - Node.js: https://nodejs.org/
        echo.
        echo Or manually open index.html in your browser.
        pause
    )
)
