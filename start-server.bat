@echo off
title Chitwan Sajha Hospital - Local Web Server
echo ============================================================
echo   Chitwan Sajha Hospital - Local Web Server Starting...
echo ============================================================
echo.
echo Opening http://127.0.0.1:8000 in your browser...
start http://127.0.0.1:8000
echo.
"C:\msys64\ucrt64\bin\python.exe" "E:\Chitwan-Sajha-Hospital\frontend\server.py"
pause
