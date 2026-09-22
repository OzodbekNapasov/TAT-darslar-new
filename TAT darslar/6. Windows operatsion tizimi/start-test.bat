@echo off
chcp 65001 > nul
title 6-Dars Testi - Shahrisabz Tibbiyot Texnikumi

echo ======================================================================
echo   Shahrisabz Tibbiyot Texnikumi
echo   "Tibbiyotda axborot texnologiyalari" fani
echo   6-Dars: Bilimni sinash testi (Windows operatsion tizimi)
echo ======================================================================
echo.
echo Test sahifasi brauzeringizda ochilmoqda...
echo 100%% offline rejim.
echo.

if exist "%~dp0test.html" (
    start "" "%~dp0test.html"
) else (
    echo Xatolik: test.html fayli topilmadi!
    pause
    exit /b 1
)

timeout /t 2 > nul
exit
