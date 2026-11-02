@echo off
title Chitwan Sajha Hospital - Local Web Server
echo ============================================================
echo   Chitwan Sajha Hospital - Local Web Server Starting...
echo ============================================================
echo.
echo Opening http://127.0.0.1:8000 in your browser...
start http://127.0.0.1:8000
echo.
set "PYTHON_EXE=python"
if exist "C:\msys64\ucrt64\bin\python.exe" set "PYTHON_EXE=C:\msys64\ucrt64\bin\python.exe"
"%PYTHON_EXE%" "%~dp0frontend\server.py"
pause
