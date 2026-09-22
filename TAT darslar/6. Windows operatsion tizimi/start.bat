@echo off
chcp 65001 > nul
title 6-Dars: Windows operatsion tizimi - Shahrisabz Tibbiyot Texnikumi

echo ======================================================================
echo   Shahrisabz Tibbiyot Texnikumi
echo   "Tibbiyotda axborot texnologiyalari" fani
echo   6-Dars: Windows operatsion tizimi va unda ishlash asoslari
echo ======================================================================
echo.
echo Darslik brauzeringizda ochilmoqda...
echo Hech qanday internet talab qilinmaydi (100%% offline).
echo.

if exist "%~dp0dars.html" (
    start "" "%~dp0dars.html"
) else (
    echo Xatolik: dars.html fayli topilmadi!
    pause
    exit /b 1
)

timeout /t 2 > nul
exit
