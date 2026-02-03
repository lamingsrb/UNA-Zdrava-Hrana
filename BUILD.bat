@echo off
REM UNA Zdrava Hrana - Production Build

title UNA - Production Build

echo.
echo ============================================================
echo          UNA ZDRAVA HRANA - PRODUCTION BUILD
echo ============================================================
echo.

cd /d "%~dp0"

echo [1/3] Installing dependencies...
call npm install
echo.

echo [2/3] Building for production...
call npm run build
echo.

echo [3/3] Build complete!
echo.
echo ============================================================
echo.
echo Production build is ready!
echo.
echo To start production server:
echo   npm start
echo.
echo To deploy:
echo   - Upload to Vercel/Netlify
echo   - Or use the .next folder
echo.
echo ============================================================
echo.

pause
