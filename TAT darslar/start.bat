@echo off
chcp 65001 > nul
title Tibbiyotda axborot texnologiyalari - Shahrisabz Tibbiyot Texnikumi

echo ======================================================================
echo   Shahrisabz Tibbiyot Texnikumi
echo   "Tibbiyotda axborot texnologiyalari" fani
echo   Bosh Mundarija - Interaktiv elektron darsliklar portali
echo ======================================================================
echo.
echo Darslar mundarijasi brauzeringizda ochilmoqda...
echo Hech qanday internet talab qilinmaydi (100%% offline).
echo.

if exist "%~dp0index.html" (
    start "" "%~dp0index.html"
) else (
    echo Xatolik: index.html fayli topilmadi!
    pause
    exit /b 1
)

timeout /t 2 > nul
exit
